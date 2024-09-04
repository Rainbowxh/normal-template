console.log('this is sth')

import { initCLS } from "./metrics/getCLS";
import getDeviceInfo from "./metrics/getDeviceInfo";
import initFCP from "./metrics/getFCP";
import { initFID } from "./metrics/getFID";
import initFP from "./metrics/getFP";
import { initLCP } from "./metrics/getLCP";
import getNetWorkInfo from "./metrics/getNetWorkInfo";
import getPageInfo from "./metrics/getPageInfo";
import { initTTFB } from "./metrics/getTTFB";
import { initWhiteScreenCheck as whiteScreenCheck } from "./metrics/getWhiteScreen";
import MetricsStore from "./store"

let metricsStore: any;

export default class WebVitals {
  immediately: boolean;
  constructor(config: any) {
    const {
      appId,
      version,
      reportCallback,
      immediately = false,
      isCustomEvent = false,
      logFpsCount = 5,
      excludeRemotePath = [],
      scoreConfig = {},
    } = config;
    this.immediately = immediately;
    const metricsStore = new MetricsStore();

    getPageInfo(metricsStore, reportCallback);
    getNetWorkInfo(metricsStore, reportCallback);
    getDeviceInfo(metricsStore, reportCallback);
    initLCP(metricsStore, reportCallback)
    initCLS(metricsStore, reportCallback)
    initTTFB(metricsStore, reportCallback)
    initFID(metricsStore, reportCallback)

    window.addEventListener('pageshow', () => {
      initFP(metricsStore, reportCallback)
      initFCP(metricsStore, reportCallback)
    })

  }
  getCurrentMetrics() {
    return metricsStore.getValues();
  }
}

