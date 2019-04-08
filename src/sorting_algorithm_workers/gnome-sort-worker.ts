import { Notifyable } from "../base_classes/notifyable";
import { IVisuableAlgorithm, IMessage } from "../base_classes/algorithm-interface";

export class InsertionSort extends Notifyable
  implements IVisuableAlgorithm<number[]> {
  run(array: number[]) {
    const beforeIteration = [...array];
    const time = Date.now();
    const moveBack = i => {
      for (; i > 0 && array[i - 1] > array[i]; i--) {
        var t = array[i];
        array[i] = array[i - 1];
        array[i - 1] = t;
        this.notify(beforeIteration, array, i);
      }
    };
    for (var i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) moveBack(i);
    }
    this.notifyFinish(time);
  }
}

const ctx: Worker = self as any;

ctx.addEventListener("message", e => {
  const message = e.data as IMessage;
  switch (message.type) {
    case "START":
      const bs = new InsertionSort(m => ctx.postMessage(m));
      bs.run(message.payload.init);
      break;
    case "STOP":
      ctx.terminate();
      break;
    default:
      console.warn("NOT KNOWN MESSAGE");
  }
});
