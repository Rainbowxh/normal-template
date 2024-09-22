const MagicString = require('magic-string')
const { parser } = require('acorn')

let bundle = new MagicString.Bundle();

bundle.addSource({
  content: "var a = 1",
  separator: "\n"
})

console.log(bundle.toString())
