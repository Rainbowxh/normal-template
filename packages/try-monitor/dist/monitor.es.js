var L = Object.defineProperty;
var F = (e, i, t) => i in e ? L(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var m = (e, i, t) => F(e, typeof i != "symbol" ? i + "" : i, t);
var s = /* @__PURE__ */ ((e) => (e.NT = "navigation-timing", e.FP = "first-paint", e.FCP = "first-contentful-paint", e.LCP = "largest-contentful-paint", e.CCP = "custom-contentful-paint", e.FID = "first-input-delay", e.RL = "resource-flow", e.CLS = "cumulative-layout-shift", e.FPS = "fps", e.ACT = "api-complete-time", e.DI = "device-information", e.NI = "network-information", e.PI = "page-information", e))(s || {});
let h = document.visibilityState === "hidden" ? 0 : 1 / 0;
const f = (e, i) => {
  var t;
  try {
    if ((t = PerformanceObserver.supportedEntryTypes) != null && t.includes(e)) {
      const n = new PerformanceObserver((o) => o.getEntries().map(i));
      return n.observe({ type: e, buffered: !0 }), n;
    }
  } catch (n) {
    throw n;
  }
}, w = (e, i = !0) => {
  const t = (n) => {
    e(n), i && (window.removeEventListener("pagehide", t), window.removeEventListener("visibilitychange", t));
  };
  window.addEventListener("pagehide", t), window.addEventListener("visibilitychange", t);
}, I = () => (w((e) => {
  h = Math.min(h, e.timeStamp);
}, !0), {
  get timeStamp() {
    return h;
  }
}), S = (e) => (console.log("有用吗"), f("layout-shift", (t) => {
  t.hadRecentInput || (e.value += t.value);
})), b = (e, i) => {
  let t = { value: 0 };
  const n = S(t);
  w(() => {
    if (n) {
      n != null && n.takeRecords && n.takeRecords().map((r) => {
        r.hadRecentInput || (t.value += r.value);
      }), n == null || n.disconnect();
      const c = {
        name: s.CLS,
        value: t.value
      };
      e.set(s.CLS, c), i(c);
    }
  });
};
function E(e, i) {
  if (!window.performance)
    return;
  const t = {
    //@ts-ignore
    memory: window.performance.memory,
    eventCounts: window.performance.eventCounts,
    timing: window.performance.timing,
    navigation: window.performance.navigation,
    timeOrigin: window.performance.timeOrigin
  };
  return e.set(s.DI, t), i(t), t;
}
function T(e, i) {
  if (!window.PerformanceObserver)
    return;
  new Promise((n, o) => {
    const r = f("paint", (a) => {
      a.name === s.FCP && (r && r.disconnect(), n(a));
    });
  }).then((n) => {
    const o = {
      name: s.FCP,
      time: n.startTime,
      raw: n
    };
    e.set(s.FCP, o), i(o);
  }).catch((n) => {
    console.log(n);
  });
}
function y(e, i) {
  if (!window.PerformanceObserver)
    return;
  new Promise((n, o) => {
    const r = f("paint", (a) => {
      a.name === s.FP && (r && r.disconnect(), n(a));
    });
  }).then((n) => {
    const o = {
      name: s.FP,
      time: n.startTime,
      raw: n
    };
    e.set(s.FP, o), i(o);
  }).catch((n) => {
    console.log(n);
  });
}
const k = (e, i) => {
  const t = {}, n = (r) => {
    t.value = r;
  }, o = f(s.LCP, n);
  let c = () => {
    var r;
    if (o && (o.takeRecords && o.takeRecords().forEach((a) => {
      const d = I();
      a.startTime < d.timeStamp && (t.value = a);
    }), t.value)) {
      o == null || o.disconnect();
      const a = {
        name: s.LCP,
        value: (r = t.value) == null ? void 0 : r.startTime
      };
      e.set(s.LCP, a), i(a), c = () => {
      };
    }
  };
  w(c), window.addEventListener("click", c, { once: !0 }), window.addEventListener("keydown", c, { once: !0 });
};
function R(e, i) {
  var n;
  if (!((n = window.navigator) != null && n.connection))
    return;
  const t = window.navigator.connection;
  return e.set(s.NT, t), i(t), t;
}
function O(e, i) {
  const { host: t, hostname: n, href: o, protocol: c, origin: r, port: a, pathname: d, search: p, hash: v } = location, { width: g, height: C } = window.screen, l = {
    width: g,
    height: C,
    host: t,
    hostname: n,
    href: o,
    protocol: c,
    origin: r,
    port: a,
    pathname: d,
    search: p,
    hash: v
  };
  return e.set(s.PI, l), i(l), l;
}
let D = class {
  constructor() {
    m(this, "state");
    this.state = /* @__PURE__ */ new Map();
  }
  set(i, t) {
    this.state.set(i, t);
  }
  get(i) {
    return this.state.get(i);
  }
  has(i) {
    return this.state.has(i);
  }
  clear() {
    this.state.clear();
  }
  getValues() {
    return Array.from(this.state).reduce((i, [t, n]) => (i[t] = n, i), {});
  }
};
console.log("this is sth");
let H;
class x {
  constructor(i) {
    m(this, "immediately");
    const {
      appId: t,
      version: n,
      reportCallback: o,
      immediately: c = !1,
      isCustomEvent: r = !1,
      logFpsCount: a = 5,
      apiConfig: d = {},
      hashHistory: p = !0,
      excludeRemotePath: v = [],
      maxWaitCCPDuration: g = 30 * 1e3,
      scoreConfig: C = {}
    } = i;
    this.immediately = c;
    const l = new D(), u = (P) => {
      console.log(P);
    };
    O(l, u), R(l, u), E(l, u), k(l, u), b(l, u), window.addEventListener("pageshow", () => {
      y(l, u), T(l, u);
    });
  }
  getCurrentMetrics() {
    return H.getValues();
  }
}
new x({});
export {
  x as WebVitals
};
