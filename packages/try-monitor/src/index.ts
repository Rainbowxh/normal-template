console.log('this is sth')

import { initCLS } from "./metrics/getCLS";
import getDeviceInfo from "./metrics/getDeviceInfo";
import initFCP from "./metrics/getFCP";
import { initFID } from "./metrics/getFID";
import initFP from "./metrics/getFP";
import { monitorFPS } from "./metrics/getFPS";
import { initLCP } from "./metrics/getLCP";
import getNetWorkInfo from "./metrics/getNetWorkInfo";
import getPageInfo from "./metrics/getPageInfo";
import { initTTFB } from "./metrics/getTTFB";
import { initWhiteScreenCheck } from "./metrics/getWhiteScreen";
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
      excludeRemotePath = [],
      maxWaitCCPDuration = 30 * 1000,
      scoreConfig = {},
    } = config;
    this.immediately = immediately;
    const metricsStore = new MetricsStore();
    const report = (info: any) =>  {
        // console.log(info.name, info)
    }

    getPageInfo(metricsStore, report);
    getNetWorkInfo(metricsStore, report);
    getDeviceInfo(metricsStore, report);
    initLCP(metricsStore, report)
    initCLS(metricsStore, report)
    initTTFB(metricsStore, report)
    initFID(metricsStore, report)
    initWhiteScreenCheck({ checkElements: [], 
      debug: true, 
      loop: 8, 
      isSkeleton: true,
      onSuccess: (result: any) => { console.log(result) },
      onFail: (result: any) => { console.log(result) },
    });

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
