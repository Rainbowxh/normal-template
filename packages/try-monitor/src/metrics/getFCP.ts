import { metricsName } from "../enums";
import { observe } from "../utils";

export default function initFCP(store: any, report: any) {
  if(!window.PerformanceObserver) {
    return;
  }

  const promise = new Promise((resolve, reject) => {
    const handler = (entry: any) => {
      if(entry.name === metricsName.FCP) {
        if(po) {
          po.disconnect();
        }
        resolve(entry)
      }
    }
    const po = observe('paint', handler)
  })

  promise.then((entry: any) => {
    const metrics = {
      name: metricsName.FCP,
      time: entry.startTime,
      raw: entry,
    }
    store.set(metricsName.FCP, metrics)
    report(metrics)
  }).catch(err => {
    console.log(err)
  })
}
