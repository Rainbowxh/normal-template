import { handleRouter } from "./handle-router";
import { rewriteRoute } from "./rewrite-router";

let _apps: any[] = []

export const getApps = () => _apps;

export const registerMicroApps = (apps: any[]) => {
  _apps = apps
}

export const start = () => {
  // 微前端的运行原理

  // 1. 监视路由变化
  // 浏览器的 前进 后退 事件,但是无法监听
  // pushState, replaceState需要通过函数重写的方式进行， 在vue-router中采用      history[replace ? 'replaceState' : 'pushState'](state, '', url)
  // pushState 为 browseHistory a -> b => a -> b -> c
  // replaceState 为 browseHistory a -> b => a -> c
  rewriteRoute();
  // 匹配子应用 vue2中需要执行，vue3会自动执行一次，就不需要执行了
  // handleRouter();
  // 加载子应用
   // 渲染子应用
}

