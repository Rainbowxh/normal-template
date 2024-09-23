import { NOT_LOADED, LOADING_SOURCE_CODE, NOT_BOOTSTRAPPED } from "../application/app.helpers.js";

/**
 * @description 将数组中的函数变成单个函数 [promise1, promise2, promise3] => promise1.then(promise2).then(promise3)
 * @param {*} fn 
 * @returns 
 */
function flattenArrayToPromise(fn) {
  const fns = Array.isArray(fn) ? fn: [fn];
  return function (props) {
    return fns.reduce((rPromise, fn) => {
      return rPromise.then(() => fn(props));
    }, Promise.resolve())
  }
}

export function toLoadPromise(app) {
  return Promise.resolve().then(() => {
    if(app.status !== NOT_LOADED) {
      return app.loadPromise || app;
    } 
    app.status = LOADING_SOURCE_CODE;
    const promises = app.loadPromise = app.loadApp(app.customProps).then((instance) => {
      const { bootstrap, mount, unmount } = instance;
      // 准备启动
      app.status = NOT_BOOTSTRAPPED;
      // 需要将以下方法变成单个函数
      app.bootstrap = flattenArrayToPromise(bootstrap);
      app.mount = flattenArrayToPromise(mount);
      app.unmount = flattenArrayToPromise(unmount);
      return app;
    })

    return promises
  })
}
