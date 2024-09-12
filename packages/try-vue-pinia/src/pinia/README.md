Pinia 
- 采用ts编写,体积小，类型提示友好使用简单
- 去除mutations，state,getters,actions中包含了同步和异步
- pinia 同时采用compositionApi 同时兼容optionsApi, 可以切换
- Vuex中需要使用module来定义模块，采用树状结构来定义，所以会出现模块覆盖
- vuex中允许程序在全局中只有一个状态(借用vue中的watch等方法)
- pinia可以采用多个store, store之间可以互相调用，不需要担心命名冲突

