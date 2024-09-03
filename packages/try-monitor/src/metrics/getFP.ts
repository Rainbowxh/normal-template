import { metricsName } from "../enums";
import { observe } from "../utils";

export default function initFP(store: any, report: any) {
  if(!window.PerformanceObserver) {
    return;
  }

  const promise = new Promise((resolve, reject) => {
    const handler = (entry: any) => {
      if(entry.name === metricsName.FP) {
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
      name: metricsName.FP,
      time: entry.startTime,
      entries: [entry],
    }
    store.set(metricsName.FP, metrics)
    report(metrics)
  }).catch(err => {
    console.log(err)
  })
}
