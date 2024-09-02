console.log('this is sth')

import { initCLS } from "./metrics/getCLS";
import getDeviceInfo from "./metrics/getDeviceInfo";
import initFCP from "./metrics/getFCP";
import initFP from "./metrics/getFP";
import { initLCP } from "./metrics/getLCP";
import getNetWorkInfo from "./metrics/getNetWorkInfo";
import getPageInfo from "./metrics/getPageInfo";
import MetricsStore from "./store"

let reporter: any;
let metricsStore: any;

class WebVitals {
  immediately: boolean;

  constructor(config: any) {
    const {
      appId,
      version,
      reportCallback,
      immediately = false,
      isCustomEvent = false,
      logFpsCount = 5,
      apiConfig = {},
      hashHistory = true,
      excludeRemotePath = [],
      maxWaitCCPDuration = 30 * 1000,
      scoreConfig = {},
    } = config;
    this.immediately = immediately;
    const metricsStore = new MetricsStore();
    const report = (info: any) =>  {
        console.log(info)
    }

    getPageInfo(metricsStore, report);
    getNetWorkInfo(metricsStore, report);
    getDeviceInfo(metricsStore, report);
    initLCP(metricsStore, report)
    initCLS(metricsStore, report)

    window.addEventListener('pageshow', () => {
      initFP(metricsStore, report)
      initFCP(metricsStore, report)
    })

  }

  getCurrentMetrics() {
    return metricsStore.getValues();
  }

}


new WebVitals({});

export { WebVitals };
