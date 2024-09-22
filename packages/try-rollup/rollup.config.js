import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
export default {
  input: "src/main.js",
  output: {
    file: "dist/dd.cjs.js",
    format: "iife",
    name: "bundle", //当天format为 iife 和 umd 时需要提供变量名字
  },
  plugins: [
    babel({
      exclude: /node_modules/,
    }),
    resolve(), // 可以加载 node_module 里面的模块
    commonjs(), // 可以支持 commonjs 语法
  ],
};
