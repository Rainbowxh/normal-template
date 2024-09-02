import { getApps } from "."
import { importHTML } from "./import-html";

export async function handleRouter() {
  // 匹配子应用
  // 1. 获取到当前的路由路径
  console.log('获取当前路径', window.location.hash.slice(1))
  const path = window.location.hash.slice(1)
  // 2. 去相应的app查找位置
  const apps = getApps();
  const app = apps.find(item => {
    return path.startsWith(item.activeRule)
  })
  console.log('现在匹配的app是', app)
  
  if(!app) {
    return;
  }
  // 加载子应用
  // 1. 请求获取entry入口,获取子应用的资源HTML, css, Js 类似于微前端下载

  //需要重新处理
  // 渲染子应用
  // eval or new Function
  // (0,eval)()
  const {
    template,
    getExternalScripts,
    execScripts
  } = await importHTML('https://www.baidu.com')
  console.log(template)
  const dom = document.getElementById(app.container);
  dom?.append(template)
}
