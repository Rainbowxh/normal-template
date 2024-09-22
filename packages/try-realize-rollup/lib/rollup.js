// const { Bundle } = require("magic-string");

const Bundle = require("./bundle");

/**
 * 打包入口文件，将结果输出岛目录
 * @param {*} entry 入口文件
 * @param {*} output 输出目录加文件名
 */
function rollup(entry, output) {
  const bundle = new Bundle({ entry });
  bundle.build(output)
}

module.exports = rollup
