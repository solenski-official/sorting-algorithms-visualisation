import { applyPatch, compare } from "fast-json-patch";
import { IMessage } from "./algorithm-interface";
export abstract class Notifyable {
    constructor(private dispatchFunction: (m: IMessage) => void) { }
    protected notifyFinish(time: number): any {
        this.dispatchFunction({ payload: { time: time }, type: "FINISHED" });
    }
    protected notify(beforeIteration: number[], afterIteration: number[], current: number | number[]) {
        const comp = compare(beforeIteration, afterIteration);
        applyPatch(beforeIteration, comp);
        this.dispatchFunction({
            type: "PATCH",
            payload: { ops: comp, current: current }
        });
    }
}
