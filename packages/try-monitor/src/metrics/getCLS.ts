import { metricsName } from "../enums";
import { observe, onAbort } from "../utils";

const getCls = (cls: any) => {
  console.log('有用吗')
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
  let cls = { value: 0 };
  const po = getCls(cls);

  let stop = () => {
    if(po) {
      if (po?.takeRecords) {
        po.takeRecords().map((entry: any) => {
          if (!entry.hadRecentInput) {
            cls.value += entry.value;
          }
        });
      }
      po?.disconnect();
  
      const metrics = {
        name: metricsName.CLS,
        value: cls.value,
      };
      store.set(metricsName.CLS, metrics);
      report(metrics);
    }
  }
  onAbort(stop)
};


