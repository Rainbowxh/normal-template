import { metricsName } from "../enums";
import {
  getFirstHiddenTime,
  observe,
  onHidden,
  onActivated,
  onOperate,
} from "../utils";

export const initLCP = (store: any, report: any): void => {
  const lcp: any = {};
  const firstHiddenTime = getFirstHiddenTime();

  onActivated(() => {
    const handler = (entry: any) => {
      if (entry.startTime < firstHiddenTime.timeStamp) {
        lcp.value = entry;
      }
    };

    const po = observe(metricsName.LCP, handler);

    let stop = () => {
      if (!po) return;
      if (po.takeRecords) {
        po.takeRecords().forEach(handler);
      }
      po?.disconnect();
      const metrics = {
        name: metricsName.LCP,
        value: lcp.value?.startTime,
        entries: [lcp.value]
      };
      store.set(metricsName.LCP, metrics);
      report(metrics);
      stop = () => void 0;
    };

    onHidden(stop);
    onOperate(stop);
  });
};
