let firstHiddenTime = document.visibilityState === "hidden" ? 0 : Infinity;

export const observe = (
  type: string,
  callback: any
): PerformanceObserver | undefined => {
  try {
    if (PerformanceObserver.supportedEntryTypes?.includes(type)) {
      const po: PerformanceObserver = new PerformanceObserver((l) => {
        return l.getEntries().map((entry) => callback(entry));
      });
      po.observe({ type, buffered: true });
      return po;
    }
  } catch (e) {
    throw e;
  }
};

export const onHidden = (callback: any, once = true) => {
  const handler = (event: any) => {
    callback(event);
    if (once) {
      window.removeEventListener("pagehide", handler);
      window.removeEventListener("visibilitychange", handler);
    }
  };
  window.addEventListener("pagehide", handler);
  window.addEventListener("visibilitychange", handler);
};

export const onActivated = (initAnalytics: any) => {
  if ((document as any).prerendering) {
    document.addEventListener("prerenderingchange", initAnalytics, {
      once: true,
    });
  } else {
    initAnalytics();
  }
};

export const onIdle = (stop: () => void) => {
  const idle = window.requestIdleCallback || window.setTimeout;
  const stopOnce = () => {
    let isRun = false;
    if (isRun) return;
    idle(stop);
    isRun = true;
  };
  if (document.visibilityState === "hidden") {
    stopOnce();
  } else {
    onHidden(stopOnce);
  }
};

export const getFirstHiddenTime = () => {
  onHidden((e: Event) => {
    firstHiddenTime = Math.min(firstHiddenTime, e.timeStamp);
  }, true);

  return {
    get timeStamp() {
      return firstHiddenTime;
    },
  };
};

export const onOperate = (callback: () => void, once = true) => {
  window.addEventListener("click", callback, { once: true });
  window.addEventListener("keydown", callback, { once: true });
};

export const getNavigationEntry = () => {
  const navigationEntry: any =
    self.performance &&
    performance.getEntriesByType &&
    performance.getEntriesByType("navigation")[0];

  if (
    navigationEntry &&
    navigationEntry.responseStart > 0 &&
    navigationEntry.responseStart < performance.now()
  ) {
    return navigationEntry;
  }
};
