
export function makeInstaller(components: any []) {
  const installer = (app: any) => components.forEach((c) => {
    app.use(c)
  })
  return installer
}

export const withInstall = <T>(component: T) => {
    (component as any).install = (app: any) => {
      const name = (component as {name: string}).name;
      app.component(name, component)
    }

    return component
} 
