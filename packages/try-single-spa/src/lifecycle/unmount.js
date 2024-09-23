import { MOUNTED, NOT_MOUNTED, UNMOUNTING } from "../application/app.helpers.js";

export function toUnmountPromise(app) {
  return Promise.resolve().then(() => {
    if (app.status !== MOUNTED) {
      return app;
    }

    app.status = UNMOUNTING
    
    return app.unmount(app.customProps).then(() => {
      console.log(app.name, "unmounted")
      app.status = NOT_MOUNTED;
    })
  });
}