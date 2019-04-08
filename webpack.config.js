// webpack.config.js
let webpack = require("webpack");

module.exports = {
  optimization: {
    minimize: false
  },
  entry: {
    index: "./src/index.ts",
    bubble_sort: "./src/sorting_algorithm_workers/bubble-sort-worker.ts",
    insertion_sort: "./src/sorting_algorithm_workers/insertion-sort-worker.ts",
    selection_sort: "./src/sorting_algorithm_workers/selection-sort-worker.ts",
    quick_sort: "./src/sorting_algorithm_workers/quick-sort-worker.ts",
    heap_sort: "./src/sorting_algorithm_workers/heap-sort-worker.ts",
    shell_sort: "./src/sorting_algorithm_workers/shell-sort-worker.ts",
    coctail_shaker_sort: "./src/sorting_algorithm_workers/coctail-shaker-sort-worker.ts",
    gnome_sort: "./src/sorting_algorithm_workers/gnome-sort-worker.ts"
    },
  output: {
    filename: "[name].js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  }
};
