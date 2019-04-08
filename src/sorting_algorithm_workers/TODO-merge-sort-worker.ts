import { IMessage, IVisuableAlgorithm } from "../base_classes/algorithm-interface";
import { Notifyable } from "../base_classes/notifyable";

export class SelectionSort extends Notifyable
  implements IVisuableAlgorithm<number[]> {
  run(array: number[]) {
    const beforeIteration = [...array];
    const time = Date.now();
    const merge = (left: any[], right: any[]) => {
      let result = [];
      let indexLeft = 0;
      let indexRight = 0;

      while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
          result.push(left[indexLeft]);
          indexLeft++;
        } else {
          result.push(right[indexRight]);
          indexRight++;
        }
      }

      return result
        .concat(left.slice(indexLeft))
        .concat(right.slice(indexRight));
    };
    // Split the array into halves and merge them recursively
    const mergeSort = (arr: any) => {
      if (arr.length === 1) {
        // return once we hit an array with a single item
        return arr;
      }

      const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
      const left = arr.slice(0, middle); // items on the left side
      const right = arr.slice(middle); // items on the right side

      return merge(mergeSort(left), mergeSort(right));
    };

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
