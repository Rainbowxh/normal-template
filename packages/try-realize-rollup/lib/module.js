// 更方便的操作字符
const { parse } = require('acorn');
const MagicString = require('magic-string');
const analysis = require('./ast/analyse');

/**
 * 负责ast解析等操作
 */
class Module {
  constructor(options) {
    this.code = new MagicString(options.code);
    this.path = options.route;
    this.bundle = options.bundle;
    // 先获取语法树
    this.ast = parse(this.code, {
      ecmaVersion: 8,
      sourceType: "module",
    })
    // 存放导入、导出哪些变量
    this.imports = {};
    
    // 存放本模块中导出了哪些变量
    this.exports = {};

    // 存放本模块的顶级变量的定义语句是哪条语句
    this.definitions = {}

    analysis(this.ast, this.code, this)
    
  }
  //展开所有语句
  expandAllStatements() {
    const allStatements = []

    this.ast.body.forEach((statement) => {
      let statements = this.expandStatement(statement);
      allStatements.push(...statements)
    })

    return allStatements;
  }
  //展开单个语句
  expandStatement(statement) {
    statement._included = true;
    const result = []

    const _dependsOn = Object.keys(statement._dependsOn);
    
    _dependsOn.forEach(name => {
      this.definitions = this.define(name)
      result.push(statement);
      return result
    })

    result.push(statement)
    return result;
  } 

  define(name) {
    if(Object.hasOwnProperty(this.imports, name)) {
      const { source, importName } = this.imports[name]

      const importedModule = this.bundle.fetchModule(source, this.path)

      const { localName } = importedModule.exports[importName];

      return importedModule.define(localName)
    }else {
      // 非导入模块，是本地模块的, 这个变量的定义语句
      const statement = this.definitions[name];

      if(statement && !statement._included) {
        return this.expandStatement(statement)
      }else {
        return []
      }
    }
  }
}

module.exports = Module
