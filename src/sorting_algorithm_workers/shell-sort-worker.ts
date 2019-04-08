import { IMessage, IVisuableAlgorithm } from "../base_classes/algorithm-interface";
import { Notifyable } from "../base_classes/notifyable";

export class ShellSort extends Notifyable
  implements IVisuableAlgorithm<number[]> {
  run(array: number[]) {
    const beforeIteration = [...array];
    const time = Date.now();
    var increment = array.length / 2;
    while (increment > 0) {
      for (let i = increment; i < array.length; i++) {
        var j = i;
        var temp = array[i];

        while (j >= increment && array[j - increment] > temp) {
          array[j] = array[j - increment];
          this.notify(beforeIteration, array, j);
          j = j - increment;
        }

        array[j] = temp;
        this.notify(beforeIteration, array, j);
      }

      if (increment == 2) {
        increment = 1;
      } else {
        increment = Math.floor((increment * 5) / 11);
      }
    }
    this.notifyFinish(time);
  }
}

const ctx: Worker = self as any;

ctx.addEventListener("message", e => {
  const message = e.data as IMessage;
  switch (message.type) {
    case "START":
      const bs = new ShellSort(m => ctx.postMessage(m));
      bs.run(message.payload.init);
      break;
    case "STOP":
      ctx.terminate();
      break;
    default:
      console.warn("NOT KNOWN MESSAGE");
  }
});
