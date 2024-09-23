import { MOUNTED, NOT_MOUNTED } from "../application/app.helpers.js";
import { registerApplication } from "../application/app.js";

export function toMountPromise(app) {
  return Promise.resolve().then(() => {
    if(app.status !== NOT_MOUNTED) {
      return app;
    }
    app.status = NOT_MOUNTED;

    return app.mount().then(() => {
      app.status = MOUNTED;
      return app;
    })
  })
}
