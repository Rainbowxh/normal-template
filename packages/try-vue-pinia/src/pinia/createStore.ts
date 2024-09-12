import { ref } from "vue"
import { PiniaSymbol } from "./rootState"

export function createPinia() {
  // 管理所有 pinia 的状态
  const state = ref({}) // 映射状态

  const _p: any = []

  const pinia = {
    install(app: any) {
      // vue2 可以通过 this.$pinia的方式来进行访问
      app.config.globalProperties.$pinia = pinia
      // vue3 可以通过全局的方式来注入
      app.provide(PiniaSymbol, pinia)
    },
    use(plugin: any) {
      _p.push(plugin);
      return this;
    },
    state,
    _p,
    _s: new Map(), // store.id => store
  }
  return pinia
}
