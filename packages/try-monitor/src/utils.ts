let firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity;

export const observe = (
  type: string,
  callback: any
): PerformanceObserver | undefined => {
  try {
    if (PerformanceObserver.supportedEntryTypes?.includes(type)) {
      const po: PerformanceObserver = new PerformanceObserver((l) => {
        return l.getEntries().map(callback)
      });

      po.observe({ type, buffered: true });
      
      return po;
    }
  } catch (e) {
    throw e;
  }
}

export const onAbort = (callback: any, once = true) => {
  const handler = (event: any) => {
    callback(event)
    if(once) {
      window.removeEventListener('pagehide', handler)
      window.removeEventListener('visibilitychange', handler)
    }
  }
  window.addEventListener('pagehide', handler)
  window.addEventListener('visibilitychange', handler)
}

export const getFirstHiddenTime = () => {
  onAbort((e: Event) => {
    firstHiddenTime = Math.min(firstHiddenTime, e.timeStamp);
  }, true);

  return {
    get timeStamp() {
      return firstHiddenTime;
    },
  };
};

