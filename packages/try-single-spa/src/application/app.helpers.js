import { apps } from "./app.js";

// App statuses
// 没有被加载
export const NOT_LOADED = "NOT_LOADED";
// 正在加载资源 路径匹配了，需要加载当前资源
export const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE";
// 资源加载成功，未启动
export const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED";
// app启动中
export const BOOTSTRAPPING = "BOOTSTRAPPING";
// app启动完成,app未挂载
export const NOT_MOUNTED = "NOT_MOUNTED";
// app挂载中
export const MOUNTING = "MOUNTING";
// app挂载完成
export const MOUNTED = "MOUNTED";
// app更新中
export const UPDATING = "UPDATING";
// app卸载中
export const UNMOUNTING = "UNMOUNTING";
// 加载失败
export const LOAD_ERROR = "LOAD_ERROR";

// 这个应用是否被激活中
export function isActive(app) {
  return app.status === MOUNTED; // 应用正在被激活
}

// 应用是否需要被激活
export function shouldBeActive(app) {
    return app.activeWhen(window.location)
}

export function getAppChanges() {
  const appsToLoad = [];
  const appsToMount = [];
  const appsToUnmount = [];

  for(const app of apps) {
    switch(app.status) {
      case NOT_LOADED:
      case LOADING_SOURCE_CODE: // 正在下载某些资源文件的时候，这个app需要被加载
        if(shouldBeActive(app)) {
          appsToLoad.push(app);
        }
        break;
      case NOT_BOOTSTRAPPED:
      case BOOTSTRAPPING:
      case NOT_MOUNTED:
        if(shouldBeActive(app)) {
          appsToMount.push(app);
        }
        break;
      case MOUNTING:
      case MOUNTED:
        if(!shouldBeActive(app)) {
          appsToUnmount.push(app);
        }
        break;
      default: 
        break;
    }
  }

  return {
    appsToLoad, 
    appsToMount, 
    appsToUnmount 
  }
}
