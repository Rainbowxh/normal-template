const acorn = require('acorn');
const sourceCode = `import $ from "jquery"`;

const ast = acorn.parse(sourceCode, {
  locations: true,
  sourceType: 'module',
  ranges: true,
  ecmaVersion: 8
})

ast.body.forEach((statement) => {
  walk(statement, {
    enter(node) {
      console.log('ast enter', node.type)
    },
    leave(node) {
      console.log('ast leave', node.type)
    }
  })
})

function walk(astNode, { enter, leave }) {
  visit(astNode, null ,enter, leave)
}

function visit(node, parent, enter, leave) {
  if(!node.type) return;

  if(enter) {
    enter(node, parent)
  }

  const keys = Object.keys(node).filter((key) => typeof node[key] === 'object')

  keys.forEach(key => {
    let value = node[key]
    if(Array.isArray(value)) {
      value.forEach(val => val.type && visit(val, node, enter, leave))
    }else if(value && value.type){
      visit(value, node, enter, leave)
    }
  })

  if(leave){
    leave(node, parent)
  }
}

