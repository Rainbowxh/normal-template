import { App, Component } from "vue"

type CompWithInstall = Component & {
  install: (app: App) => void
}

export function withInstall(fn: Component & { name: string }): CompWithInstall {
  const install = (app: App) => {
    app.component(fn.name, fn)
  }
  (fn as any).install = install
  return fn as CompWithInstall
}
