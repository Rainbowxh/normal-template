import { reroute } from "../navigation/reroute.js";
import { NOT_LOADED } from "./app.helpers.js";

// 注册应用， 并检查当前路径是否匹配， 如果匹配则加载应用
export const apps = []

export function registerApplication(name, loadApp, activeWhen, customProps) {
  const registration = {
    name,
    loadApp,
    activeWhen,
    customProps,
    status: NOT_LOADED
  }

  apps.push(registration);


  // 给每个应用添加声明周期
  // not-loaded loading-source-code not-bootstrap bootstraping not-mounted mounted loading

  // 需要检查哪些应用需要被加载，哪些应用需要被移除
  reroute()
}
