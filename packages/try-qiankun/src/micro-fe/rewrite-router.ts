import { handleRouter } from "./handle-router";

export function rewriteRoute() {
  window.addEventListener('popstate', () => {})

  const rawPushState = window.history.pushState
  window.history.pushState = (...args) => {
    console.log("monitor pushState api")
    rawPushState.call(window.history, ...args);
    handleRouter();
  }

  const rawReplaceState = window.history.replaceState
  window.history.replaceState = (...args) => {
    console.log("monitor replaceState api")
    rawReplaceState.call(window.history, ...args);
    handleRouter();
  }
}
