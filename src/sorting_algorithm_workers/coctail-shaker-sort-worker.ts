import { IMessage, IVisuableAlgorithm } from "../base_classes/algorithm-interface";
import { Notifyable } from "../base_classes/notifyable";

export class InsertionSort extends Notifyable
  implements IVisuableAlgorithm<number[]> {
  run(array: number[]) {
    const beforeIteration = [...array];
    const time = Date.now();
    var swapped;
    do {
      for (var i = 0; i < array.length - 2; i++) {
        if (array[i] > array[i + 1]) {
          var temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          swapped = true;
        }
        this.notify(beforeIteration, array, i);
      }
      if (!swapped) {
        break;
      }
      swapped = false;
      for (i = array.length - 2; i > 0; i--) {
        if (array[i] > array[i + 1]) {
          var temp1 = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp1;
          swapped = true;
        }
        this.notify(beforeIteration, array, i);
      }
    } while (swapped);
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
