import { Observable, of } from "rxjs";
import { map, filter, concatMap, delay } from "rxjs/operators";
import { IMessage } from "../base_classes/algorithm-interface";

export const delayedPatchesOnly = (delayTime: number) => (
  source: Observable<MessageEvent>
) =>
  source.pipe(
    map(ev => ev.data as IMessage),
    filter(m => m.type === "PATCH"),
    concatMap(_ => of(_).pipe(delay(delayTime)))
  );
