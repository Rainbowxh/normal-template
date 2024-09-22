function walk(astNode, { enter, leave }) {
  visit(astNode, null, enter, leave);
}

function visit(node, parent, enter, leave) {
  console.log(node)
  if (!node.type) return;

  if (enter) {
    enter(node, parent);
  }

  const keys = Object.keys(node).filter((key) => typeof node[key] === "object");

  keys.forEach((key) => {
    let value = node[key];
    if (Array.isArray(value)) {
      value.forEach(val =>  visit(val, node, enter, leave))
    } else if (value && value.type) {
      visit(value, node, enter, leave);
    }
  });

  if (leave) {
    leave(node, parent);
  }
}



const ast = {
  "type": "Program",
  "start": 0,
  "end": 41,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 41,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 12,
        "name": "abc"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 15,
        "end": 41,
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 18,
            "end": 39,
            "id": {
              "type": "Identifier",
              "start": 27,
              "end": 30,
              "name": "abc"
            },
            "expression": false,
            "generator": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 32,
              "end": 39,
              "body": []
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}


ast.body.forEach(node => walk(node, {}))


module.exports = walk;
