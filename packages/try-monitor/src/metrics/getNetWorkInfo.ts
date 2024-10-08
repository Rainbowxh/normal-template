import { metricsName } from "../enums";

export default function getNetWorkInfo(store: any, report: any) {
  if(!(window.navigator as any)?.connection) {
    return;
  }

  const result = (window.navigator as any).connection

  result.name = metricsName.NT

  store.set(metricsName.NT, result)

  report(result);
  
  return result
}
