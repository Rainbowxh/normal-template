import { reroute } from "./reroute.js";

function urlRoute() {
  reroute();
}

export function patchHistoryApi() {
  const originWindowPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    originWindowPushState.apply(window.history, ...args);
    urlRoute()
  }

  const originWindowReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    originWindowReplaceState.apply(window.history, ...args);
    urlRoute()
  }

  const hashchange = urlRoute
  const popstate = urlRoute

  // 监控操作需要被延迟到应用挂载完毕后再执行
  window.addEventListener('hashchange', hashchange)
  window.addEventListener('popstate', popstate)

  const capturedEventListerners = {
    hashchange: [],
    popstate: []
  }
  const listerningTo = ['hashchange', 'popstate'];
  const originalAddEventListener = window.addEventListener;
  const removeEventListener = window.removeEventListener;
  window.addEventListener = function (event, fn){
    if(listerningTo.includes(event) && capturedEventListerners[e].some(listener === fn)) {
      capturedEventListerners[event].push(fn)
    }else {
      originalAddEventListener.call(this, event, fn)
    }
  }

  window.removeEventListener = function (event, fn){
    if(listerningTo.includes(event) && capturedEventListerners[e].some(listener === fn)) {
      capturedEventListerners[event] = capturedEventListerners[event].filter(listener !== fn)
    }else {
      removeEventListener.call(this, event, fn)
    }
  }

  function callCaptureEventListeners(event) {
    const keys = Object.keys(capturedEventListerners)

    for(let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if(Array.isArray(capturedEventListerners[key])) {
        capturedEventListerners[key].forEach(listener => {
          originWindowAddEventListener.call(window, key, listener)
        })
      }
    }
  }


  return () => {
    window.history.pushState = originWindowPushState
    window.history.replaceState = originWindowReplaceState
    window.removeEventListener('hashchange', hashchange)
    window.removeEventListener('popstate', popstate)
  }
}

patchHistoryApi()


