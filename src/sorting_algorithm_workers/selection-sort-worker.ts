import { IMessage, IVisuableAlgorithm } from "../base_classes/algorithm-interface";
import { Notifyable } from "../base_classes/notifyable";

export class SelectionSort extends Notifyable
  implements IVisuableAlgorithm<number[]> {
  run(array: number[]) {
    const beforeIteration = [...array];
    const time = Date.now();
    var temp;
    for (var i = 0; i < array.length; i++) {
      var mi = i;

      for (var j = i + 1; j < array.length; j++) {
        if (array[j] < array[mi]) mi = j;
        this.notify(beforeIteration, array, j)
      }

      temp = array[i];
      array[i] = array[mi];
      array[mi] = temp;
      this.notify(beforeIteration, array, i)
    }
    this.notifyFinish(time);
  }
}

const ctx: Worker = self as any;

ctx.addEventListener("message", e => {
  const message = e.data as IMessage;
  switch (message.type) {
    case "START":
      const bs = new SelectionSort(m => ctx.postMessage(m));
      bs.run(message.payload.init);
      break;
    case "STOP":
      ctx.terminate();
      break;
    default:
      console.warn("NOT KNOWN MESSAGE");
  }
});
