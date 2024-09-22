const Scope = require('./scope');

var a = 1;

function one() {
  var b = 2;
  function two() {
    var c = 3;
    console.log(a, b, c)
  }
}

let globalScope = new Scope({
  name: 'global',
  names: ['a'],
  parent: null
})


console.log(globalScope.findDefiningScope('a'))
