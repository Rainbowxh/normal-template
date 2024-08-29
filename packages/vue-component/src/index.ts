import { App } from "vue"
import test from "./test.vue"
export interface PluginOptions {
  name?: string
}
export default {
  install(app: App, options?: PluginOptions) {
    const name = options?.name ?? 'vue3-word'
    app.component(name, test)
  }
}

export {
  test
}
