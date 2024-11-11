const walk = require("./walk")
const scope = require('./scope');
const Scope = require("./scope");
/**
 * 分析模块对应的ast 语法树
 * @param {} ast 
 * @param {*} code 
 * @param {*} module 
 */
function analysis(ast, code, module) {
  // 开启第一轮循环，找出本模块导入、导出哪些变量
  ast.body.forEach((statement) => {
    Object.defineProperties(statement, {
      _included: { value: false, writable: true }, //这条语句默认不包含在输出结果里面
      _module: { value: module },
      // 这是这个语句对应的自己的源代码
      _source: { value: code.snip(statement.start,statement.end)},
      _dependsOn: { value: {}, writable: true},
      _defines: { value: [], writable: true }
    })

    // 找出导入哪些变量
    if(statement.type === 'ImportDeclaration') {

      // 获取导入的模块的相对路径
      const source = statement.source.value;

      statement.specifiers.forEach((specifier) => {
        const importName = specifier.imported.name; // 导入的变量明
        const localName = specifier.local.name; // 当前模块的变量名
        // 当前模块导入的变量名localName 来自 source 模块导出的importName
        module.imports[localName] = { source, importName }
      })
    }else if(statement.type === 'ExportNamedDeclaration') {
      const declaration = statement.declaration;
      if(declaration && declaration.type === 'VariableDeclaration') {

        const declarations = declaration.declarations
        declarations.forEach((variableDeclarator) => {
          const localName = variableDeclarator.id.name;
          const exportName = localName;
          module.exports[exportName] = { localName }
        })  
      }else if (statement.type === 'ExportNamedDeclaration') {
        statement.specifiers.forEach((specifier) => {
          const exportName = specifier.exported.name; // 导入的变量明
          const localName = specifier.local.name; // 当前模块的变量名
          // 当前模块导入的变量名localName 来自 source 模块导出的importName
          module.exports[exportName] = { localName }
        })
      }
    }
  });

  // 开启第二轮循环，创建作用域链
  // 需要知道用到了哪些变量  
  // 我需要我使用到了哪些变量
  // 需要知道这个变量是 局部变量 全局变量 私有变....
  // 先创建顶级作用域
  let currentScope = new Scope({ name: '模块内的顶级作用域' })
  ast.body.forEach((statement)=> {
    function addToScope(name) {
      // 此变量名添加到当前作用域变量数组中
      currentScope.add(name);
      // 顶级作用域，那此变量是顶级变量
      if(!currentScope.parentScope) {
        //此语句定义了一个顶级变量
        statement._defines[name] = true;
        // 此顶级变量的定义语句就是这条语句
        statement.definitions[name] = statement
      }

    }
    // 用深度有限的方式访问我们的子节点
    walk(statement, {
      enter(node) {
        if(node.type === 'Identifier') {
          // 当前这个语句依赖了 node.name 这个变量
          statement._dependsOn[node.name] = true;
        }
        let newScope;
        switch(node.type) {
          case "ArrowFunctionExpression":
          case 'FunctionDeclaration': 
            addToScope(node.id.name)
            const names = node.params.map(param => param.name)
            newScope = new Scope({
              name: node.id.name,
              parent: currentScope,
              names: [...names]
            })
            break;
          case "VariableDeclarator": 
            node.declarations.forEach(declaration => {
              addToScope(declaration.id.name)
            })
            break;
          case "BlockStatement":
            break;
          default: 
            break;
        }

        if(newScope) {
          Object.defineProperty(node, "_scope", { value: newScope })
        }
      },
      leave(node) {
        if(Object.hasOwnProperty(node, '_scope')) {
          currentScope = currentScope.parent
        }
      }
    })
  })
}

module.exports = analysis
