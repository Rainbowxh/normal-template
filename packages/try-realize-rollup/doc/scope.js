class Scope {
  constructor(options = {}) {
    // 作用域 的名称
    this.name = options.name;
    // 父作用域
    this.parent = options.parent;
    // 作用域中定义的变量
    this.names = options.names || []
  }
  add(name) {
    this.names.push(name)
  }
  findDefiningScope(name) {
    // 链式查找
    if(this.names.includes(name)) {
      return this;
    }else if(this.parent) {
      return this.parent.findDefiningScope(name)
    }else {
      return null
    }
  }
}

module.exports = Scope
