/**
 * app 每个字应用有三个声明周期
 *  1. bootstrap // 全局缓存的变量
 *  1. mount // 挂载
 *  1. unmount // 卸载
 * 
 * const app1 = { bootstrap: [], mount: [], unmount: []}
 * const app2 = {
 *  bootstrop: async () => {}, 
 *  mount: async () => { new Vue().$mount('#app') }, 
 *  unmount: async () => {}
 * }
 * 
 * const { registerApplication, start } = single-spa
 * registerApplication('app1', async () => app1, location => location.hash.startsWidth('#a'))
 * start();
 */
import { registerApplication } from "./application/app.js"
import { start } from "./start.js"

const app1 = {
  bootstrap: async () => {},
  mount: async () => {
    const el = document.getElementById('a');
    el.innerHTML = 'app1';
  },
  unmount: async () => {
    const el = document.getElementById('a');
    el.innerHTML = '';
  }
}

const app2 = {
  bootstrap: async () => {},
  mount: async () => {
    const el = document.getElementById('b');
    el.innerHTML = 'app2';
  },
  unmount: async () => {
    const el = document.getElementById('b');
    el.innerHTML = '';
  }
}

const module = {}

registerApplication('app1', async () => app1, location => location.hash.startsWith('#/a'), module);
registerApplication('app2', async () => app2, location => location.hash.startsWith('#/b'), module);

start();
