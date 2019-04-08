import { IMessage, IVisuableAlgorithm } from "../base_classes/algorithm-interface";
import { Notifyable } from "../base_classes/notifyable";

export class HeapSort extends Notifyable
  implements IVisuableAlgorithm<number[]> {
  run(array: number[]) {
    const beforeIteration = [...array];
    const time = Date.now();
    const swap = (array, firstItemIndex, lastItemInde) => {
      var tmp = array[firstItemIndex];

      // Swap first and last items in the array.
      array[firstItemIndex] = array[lastItemInde];
      array[lastItemInde] = tmp;
      this.notify(beforeIteration, array, [firstItemIndex, lastItemInde] )
    };

    const heapify = (heap, i, max) => {
      var index, leftChild, righChild;

      while (i < max) {
        index = i;

        leftChild = 2 * i + 1;
        righChild = leftChild + 1;

        if (leftChild < max && heap[leftChild] > heap[index]) {
          index = leftChild;
        }

        if (righChild < max && heap[righChild] > heap[index]) {
          index = righChild;
        }

        if (index == i) {
          return;
        }

        swap(heap, i, index);

        i = index;
      }
    };
    const buildMaxHeap = array => {
      var i;
      i = array.length / 2 - 1;
      i = Math.floor(i);

      // Build a max heap out of
      // all array elements passed in.
      while (i >= 0) {
        heapify(array, i, array.length);
        i -= 1;
      }
    };
    let lastElement;
    const heapSort = array => {
      // Build our max heap.
      buildMaxHeap(array);

      // Find last element.
      lastElement = array.length - 1;

      // Continue heap sorting until we have
      // just one element left in the array.
      while (lastElement > 0) {
        swap(array, 0, lastElement);

        heapify(array, 0, lastElement);

        lastElement -= 1;
      }
    };
    heapSort(array);
    this.notifyFinish(time);
  }
}

const ctx: Worker = self as any;

ctx.addEventListener("message", e => {
  const message = e.data as IMessage;
  switch (message.type) {
    case "START":
      const bs = new HeapSort(m => ctx.postMessage(m));
      bs.run(message.payload.init);
      break;
    case "STOP":
      ctx.terminate();
      break;
    default:
      console.warn("NOT KNOWN MESSAGE");
  }
});
