import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(components: Plugin[]) {
  const installer = (app: App) =>
    components.forEach((c) => {
      app.use(c);
    });

  return installer;
}

export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: any) => {
    const name = (component as { name: string }).name;
    app.component(name, component);
  };

  return component;
};
