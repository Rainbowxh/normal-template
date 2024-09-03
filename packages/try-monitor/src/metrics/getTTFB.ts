import { metricsName } from "../enums";
import { getNavigationEntry, onActivated } from "../utils";

export const initTTFB = (store: any, report: any): void => {
  let metric: any = { name: metricsName.TTFB  };

  onActivated(() => {
    const navigationEntry = getNavigationEntry();

    if (!navigationEntry) return;

    metric.entries = [navigationEntry];
    // The activationStart reference is used because TTFB should be
    // relative to page activation rather than navigation start if the
    // page was prerendered. But in cases where `activationStart` occurs
    // after the first byte is received, this time should be clamped at 0.
    metric.value = Math.max(
      navigationEntry.responseStart - navigationEntry.activationStart,
      0
    );
    store.set(metricsName.TTFB, metric)
    report(metric);
  });
};
