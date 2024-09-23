import { BOOTSTRAPPING, NOT_BOOTSTRAPPED, NOT_MOUNTED } from "../application/app.helpers.js"

// 有切仅有一次的bootstrap
export function tryToBootstrapPromise(app) {
  return Promise.resolve().then(() => {
    if(app.status !== NOT_BOOTSTRAPPED) {
      return app.mountPromise || app;
    }
    app.status =  BOOTSTRAPPING;

    const mountPromise = app.mountPromise = app.bootstrap().then(() => {
      app.status = NOT_MOUNTED;
      return app;
    })

    return mountPromise;
  })
}
