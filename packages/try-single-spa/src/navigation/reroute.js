import {
  BOOTSTRAPPING,
  getAppChanges,
  shouldBeActive,
} from "../application/app.helpers.js";
import { tryToBootstrapPromise } from "../lifecycle/bootstrap.js";
import { toLoadPromise } from "../lifecycle/load.js";
import { toMountPromise } from "../lifecycle/mount.js";
import { toUnmountPromise } from "../lifecycle/unmount.js";
import { started } from "../start.js";
import "./navigation-event.js"

/**
 * 第一次注册app的时候
 * 路由变化的时候 /#a => /#b
 */
export function reroute() {
  // 知道哪几个任务需要
  const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges();

  if (started) {
    // 用户调用了start方法， 处理当前应用
    return preformAppChange();
  } else {
    const loadMountPromises = loadApps();
    return loadMountPromises;
  }

  function loadApps() {
    return Promise.all(
      appsToLoad.map((app) =>
        toLoadPromise(app).then((app) => {
          return tryToBootstrapPromise(app);
        })
      )
    );
  }

  function preformAppChange() {
    // 卸载应用
    const unmountAllPromises = Promise.all(appsToUnmount.map(toUnmountPromise));

    // 2 加载需要应用, 可能这个应用已经被加载了
    // 默认注册的路径是 "/#a", 当我们start的时候应用是"/#b""
    appsToLoad.map((app) => {
      return toLoadPromise(app).then((app) => {
        // 应用加载完毕后，需要启动和挂载, 确保先卸载带哦应用
        tryToBootstrapAppMount(app, unmountAllPromises);
      });
    });
    // 加载需要渲染的部分
    appsToMount.map((app) => tryToBootstrapAppMount(app, unmountAllPromises))
  }

  // 先启动应用 =》 卸载应用 =》 挂载应用
  function tryToBootstrapAppMount(app, unmountAllPromises) {
    if (shouldBeActive(app)) {
      console.log("尝试加载", app.status);
      return tryToBootstrapPromise(app).then((app1) => {
        return unmountAllPromises.then(() => {
          toMountPromise(app1);
        });
      });
    }
  }
}
