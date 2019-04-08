import { WorkerAtWork } from "./base_classes/worker-at-work";
import { range, random } from "lodash";

const workers = {
  bubbleSort: new WorkerAtWork(
    new Worker("dist/bubble_sort.js"),
    "bubbleSortGraph"
  ),
  insertionSort: new WorkerAtWork(
    new Worker("dist/insertion_sort.js"),
    "insertionSortGraph"
  ),
  selectionSort: new WorkerAtWork(
    new Worker("dist/selection_sort.js"),
    "selectionSortGraph"
  ),
  quickSort: new WorkerAtWork(
    new Worker("dist/quick_sort.js"),
    "quickSortGraph"
  ),
  heapSort: new WorkerAtWork(new Worker("dist/heap_sort.js"), "heapSortGraph"),
  shellSort: new WorkerAtWork(
    new Worker("dist/shell_sort.js"),
    "shellSortGraph"
  ),
  coctailShakerSort: new WorkerAtWork(
    new Worker("dist/coctail_shaker_sort.js"),
    "coctailShakerSortGraph"
  ),
  gnomeSort: new WorkerAtWork(
    new Worker("dist/gnome_sort.js"),
    "gnomeSortGraph"
  )
};

function init() {
  const starting = range(0, 100, 1).map(_ => random(0, 100));
  workers.bubbleSort.run([...starting]);
  workers.insertionSort.run([...starting]);
  workers.selectionSort.run([...starting]);
  workers.quickSort.run([...starting]);
  workers.heapSort.run([...starting]);
  workers.shellSort.run([...starting]);
  workers.coctailShakerSort.run([...starting]);
  workers.gnomeSort.run([...starting]);
}

(function() {
  init();
})();
