import { metricsName } from "../enums";

export default function getNetWorkInfo(store: any, report: any) {
  if(!window.navigator?.connection) {
    return;
  }

  const result = window.navigator.connection

  store.set(metricsName.NT, result)


  report(result);
  
  return result
}
