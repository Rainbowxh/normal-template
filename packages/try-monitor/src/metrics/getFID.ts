import { metricsName } from "../enums"
import { getFirstHiddenTime, observe, onActivated, onHidden } from "../utils"

export const initFID = (store: any, report: any) => {
  const metric: any = { name: metricsName.FID, value: 0, entries: [] }
  const firstHiddenTime = getFirstHiddenTime()

  onActivated(() => {
    const handler = (entry: any) => {
      // Only report if the page wasn't hidden prior to the first input.
      if(entry.startTime < firstHiddenTime.timeStamp) {
        metric.value = entry.processingStart - entry.startTime;
        metric.entries.push(entry);
        store.set(metric);
        report(metric)
      }
    }

    const po = observe('first-input', handler)

    const stopHandler = () => {
      if(!po) return;
      po.takeRecords && po.takeRecords().forEach(handler)
      po.disconnect();
    }

    onHidden(stopHandler)
  })
} 
