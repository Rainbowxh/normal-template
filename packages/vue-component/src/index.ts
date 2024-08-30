import { App } from "vue"
import componentA from "./component.vue"
export interface PluginOptions {
  name?: string
}
export default {
  install(app: App, options?: PluginOptions) {
    const name = options?.name ?? 'vue-component'
    app.component(name, componentA)
  }
}

export {
  componentA
}
