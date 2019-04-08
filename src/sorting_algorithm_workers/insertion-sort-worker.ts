import { IMessage, IVisuableAlgorithm } from "../base_classes/algorithm-interface";
import { Notifyable } from "../base_classes/notifyable";

export class InsertionSort extends Notifyable
  implements IVisuableAlgorithm<number[]> {
  run(array: number[]) {
    const beforeIteration = [...array];
    const time = Date.now();
    for (var i = 0; i < array.length; i++) {
      let value = array[i];
      for (var j = i - 1; j > -1 && array[j] > value; j--) {
        array[j + 1] = array[j];
        this.notify(beforeIteration, array, j);
      }
      array[j + 1] = value;
      this.notify(beforeIteration, array, j);
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
