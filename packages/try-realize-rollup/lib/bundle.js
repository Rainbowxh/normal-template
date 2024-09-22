const path = require('path')
const fs = require('fs');
const Module = require('./module');
const MagicString = require('magic-string');
/**
 * 负责编译
 */
class Bundle {
  constructor(options) {
    // entry file path
    this.entryPath = path.resolve(options.entry.replace(/\.js$/, '') + '.js' );
    this.statements = []
    this.modules = new Set();
  }
  build(output) {
    // 获取
    const entryModule = this.fetchModule(this.entryPath)
    // 分析所有中的statement 
    if(!entryModule) return;
    
    this.statements = entryModule.expandAllStatements();

    const { code } = this.generate();

    fs.writeFileSync(output, code);
  }
  // 这个模块对应的真实路径
  /**
   * 
   * @param {*} importee 被引入的模块 "./msg.js"
   * @param {*} importer 引入别的模块 main.js
   * @returns 
   */
  fetchModule(importee, importer) {
    let route;

    if(!importer) {
      route = importee
    }else {
      if(path.isAbsolute(importee)) {
        route = importee;
      }else {
        route = path.resolve(path.dirname(importer), importee)
      }
    }

    if(route) {
      // 读取文件
      const code = fs.readFileSync(route, 'utf-8');

      // 创建模块的实例
      const module = new Module({
        code,
        path: route,
        bundle: this,
      })
      this.modules.add(module)
      return module
    }
  }
  generate() {
    let magicStringBundle = new MagicString.Bundle();
    // 生成最终的模块
    this.statements.forEach((statement) => {
      const source = statement._source.clone();
      magicStringBundle.addSource({
        content: source,
        separator: '\n'
      });
    })
    return { code: magicStringBundle.toString() }
  }
}

module.exports = Bundle

/**
 * rollup file module = webpack file module
 */
