import { metricsName } from "../enums";
import { observe, onHidden } from "../utils";

const getCls = (cls: any) => {
  const handler = (entry: any) => {
    if (!entry.hadRecentInput) {
      cls.value += entry.value;
    }
  }

  return observe('layout-shift', handler)
}


/**
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * @param {IScoreConfig} scoreConfig
 * */
export const initCLS = (
  store: any,
  report: any,
): void => {
  let cls: any = { value: 0, entries: [] };

  const handler = (entry: any) => {
    // Only count layout shifts without recent user input.
    // Calculate all offset percent;
    if (!entry.hadRecentInput) {
      cls.value += entry.value;
      cls.entries.push(entry)
    }
  }

  const po =  observe('layout-shift', handler)

  let stop = () => {
    if(po) {
      if (po?.takeRecords) {
        po.takeRecords().map(handler);
      }
      po?.disconnect();
      const metrics = {
        name: metricsName.CLS,
        value: cls.value,
        entires: cls.entries,
      };
      store.set(metricsName.CLS, metrics);
      report(metrics);
    }
  }
  onHidden(stop)
};


