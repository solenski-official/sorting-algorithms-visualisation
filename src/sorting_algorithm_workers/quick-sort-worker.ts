import { IMessage, IVisuableAlgorithm } from "../base_classes/algorithm-interface";
import { Notifyable } from "../base_classes/notifyable";

export class QuickSort extends Notifyable
  implements IVisuableAlgorithm<number[]> {
  run(array: number[]) {
    const beforeIteration = [...array];
    const quickSort = (arr: any[], left: number, right: number) => {
      const partition = (
        arr: any[],
        pivot: number,
        left: any,
        right: number
      ) => {
        const swap = (arr: any[], i: number, j: number) => {
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          this.notify(beforeIteration, arr, i);
        };

        var pivotValue = arr[pivot],
          partitionIndex = left;

        for (var i = left; i < right; i++) {
          if (arr[i] < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
          }
          this.notify(beforeIteration, arr, i);

        }
        swap(arr, right, partitionIndex);
        return partitionIndex;
      };
      var pivot, partitionIndex;

      if (left < right) {
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right);

        //sort left and right
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
      }
    }

    const time = Date.now();
    quickSort(array, 0, array.length - 1);
    this.notifyFinish(time);
  }
}

const ctx: Worker = self as any;

ctx.addEventListener("message", e => {
  const message = e.data as IMessage;
  switch (message.type) {
    case "START":
      const bs = new QuickSort(m => ctx.postMessage(m));
      bs.run(message.payload.init);
      break;
    case "STOP":
      ctx.terminate();
      break;
    default:
      console.warn("NOT KNOWN MESSAGE");
  }
});
