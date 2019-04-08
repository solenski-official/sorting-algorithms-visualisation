import { applyPatch } from "fast-json-patch";
import { fromEvent, Observable, Subscription } from "rxjs";
import { IMessagePayload, IMessage } from "./algorithm-interface";
import { delayedPatchesOnly } from "../extentions/custom-rxjs-ops";
import { newPlot, update, Root } from "plotly.js";
import { filter, map, take } from "rxjs/operators";
import { nth, toNumber, isArray, includes } from "lodash";
export class WorkerAtWork {
  messages$: Observable<MessageEvent>;
  finished$: Observable<IMessage>;
  private sub!: Subscription;
  constructor(
    private worker: Worker,
    private plotRoot: Root,
    private options: {
      markedColor: string;
      unmarkedColor: string;
      changedColor: string;
    } = {
      markedColor: "rgba(222,45,38,0.8)",
      unmarkedColor: "rgba(204,204,204,1)",
      changedColor: "rgba(255,255,224,1)"
    }
  ) {
    this.messages$ = fromEvent<MessageEvent>(worker, "message");
    this.finished$ = this.messages$.pipe(
      map(x => x.data),
      filter(m => m.type === "FINISHED")
    );
  }
  run(starting_data: any) {
    this.sub = this.messages$
      .pipe(delayedPatchesOnly(300))
      .subscribe(m => this.update(m.payload, starting_data));
    newPlot(this.plotRoot, [
      {
        x: starting_data.map((_: any, i: number) => i),
        y: starting_data,
        type: "bar",
        marker: {
          color: starting_data.map((_: any, i: number) =>
            i === 0 ? "rgba(222,45,38,0.8)" : "rgba(204,204,204,1)"
          )
        }
      }
    ]);
    this.worker.postMessage({
      payload: { init: starting_data },
      type: "START"
    });
  }
  stop() {
    this.worker.postMessage({
      type: "STOP"
    });
    this.sub.unsubscribe();
  }
  update(payload: IMessagePayload, starting_data: number[]): any {
    if (payload.ops !== undefined && payload.current !== undefined) {
      applyPatch(starting_data, payload.ops);
      const changed = payload.ops.map(x =>
        toNumber(nth(x.path.match(/\d+/), 0))
      );
      update(
        this.plotRoot,
        {
          x: [starting_data.map((_, i) => i)],
          y: [starting_data],
          marker: {
            color: starting_data.map((_, i) => {
              if (
                i === payload.current ||
                (isArray(payload.current) && includes(payload.current, i))
              ) {
                return this.options.markedColor;
              } else if (changed.some(x => x == i))
                return this.options.changedColor;
              else return this.options.unmarkedColor;
            })
          }
        },
        <any>undefined // wrong typings
      );
    }
  }
}
