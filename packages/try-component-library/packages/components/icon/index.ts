import { Plugin } from "vue";
import _Icon from "./src/icon.vue"

export type SFCWithInstall<T> = T & Plugin;

export function withInstall<T>(comp:T) {
  (comp as SFCWithInstall<T>).install = function(app: any) {
    const { name } = comp as { name: string };
    if(!name) {
      console.warn('Component must have a name!');
      return;
    }
    app.component(name, comp)
  }
  return comp;
}


export const Icon = withInstall(_Icon)

export default Icon;

export * from "./src/icon"
