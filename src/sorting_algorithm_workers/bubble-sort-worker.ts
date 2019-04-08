import { IMessage, IVisuableAlgorithm } from "../base_classes/algorithm-interface";
import { Notifyable } from "../base_classes/notifyable";

export class BubbleSort extends Notifyable
  implements IVisuableAlgorithm<number[]> {
  run(array: number[]) {
    const beforeIteration = [...array];
    const time = Date.now();
    for (let j = 0; j < array.length; j++) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] > array[i + 1]) {
          var temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
        }
        this.notify(beforeIteration, array, i);
      }
    }
    this.notifyFinish(Date.now() - time);
  }
}

const ctx: Worker = self as any;

ctx.addEventListener("message", e => {
  const message = e.data as IMessage;
  switch (message.type) {
    case "START":
      const bs = new BubbleSort(m => ctx.postMessage(m));
      bs.run(message.payload.init);
      break;
    case "STOP":
      ctx.terminate();
      break;
    default:
      console.warn("NOT KNOWN MESSAGE");
  }
});
