import { metricsName } from "../enums";
import { getFirstHiddenTime, observe, onAbort } from "../utils";


export const initLCP = (
  store: any,
  report: any,
): void => {
  const lcp: any = {}
  
  const handler = (entry: any) => {
      lcp.value = entry;
  }

  const po = observe(metricsName.LCP, handler);

  let stop = () => {
    if(po) {
      // 如果当页面备用隐藏的时候由开始事件小于
      if (po.takeRecords) {
        po.takeRecords().forEach((entry: PerformanceEntry) => {
          const firstHiddenTime = getFirstHiddenTime();
          if (entry.startTime < firstHiddenTime.timeStamp) {
            lcp.value = entry;
          }
        });
      }
      if(lcp.value) {
        po?.disconnect();
        const metrics = {
          name: metricsName.LCP,
          value: lcp.value?.startTime,
        }
        store.set(metricsName.LCP, metrics)
        report(metrics)
        stop = () => void 0
      }
    }
  }
  onAbort(stop)
  window.addEventListener('click', stop, { once: true })
  window.addEventListener('keydown', stop, { once: true })
};

