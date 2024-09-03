import { metricsName } from "../enums";

export default function getDeviceInfo(store: any, report: any) {
  if(!window.performance) {
    return;
  }
  const result = {
    name: metricsName.DI,
    //@ts-ignore
    memory: window.performance.memory,
    eventCounts: window.performance.eventCounts,
    timing:window.performance.timing,
    navigation:window.performance.navigation,
    timeOrigin:window.performance.timeOrigin,
  }
  store.set(metricsName.DI, result)
  report(result);
  return result
}
