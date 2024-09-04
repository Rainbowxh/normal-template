var q = Object.defineProperty;
var x = (e, n, t) => n in e ? q(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var I = (e, n, t) => x(e, typeof n != "symbol" ? n + "" : n, t);
function _() {
  return document.elementsFromPoint ? !0 : (console.warn("browser do not support white screen check"), !1);
}
const oe = (e = { checkElements: [], debug: !0 }) => {
  try {
    let n = function() {
      $(() => {
        (!document || !document.elementsFromPoint) && console.warn("当前浏览器不支持白屏检测");
        let r = !0;
        const d = [...F, ...b];
        for (let h = 0; h < d.length; h++) {
          const u = d[h], V = `point-${u[0]}-${u[1]}`, A = document.elementsFromPoint(u[0], u[1]), R = [];
          for (let W of A) {
            const j = s(W);
            if (R.push(j), c(W)) {
              r = !1, m && i(g, u[0], u[1], "#00ff00");
              break;
            } else
              m && i(g, u[0], u[1], "#ff3300");
          }
          if (C[V] = R, !r && !k)
            break;
        }
        r ? o() : (w && clearTimeout(w), E = 0, M(C));
      });
    }, t = function() {
      const r = document.createElement("canvas");
      document.body.appendChild(r), g = r.getContext("2d"), r.width = window.innerWidth, r.height = window.innerHeight, r.style.position = "absolute", r.style.top = "0", r.style.left = "0", r.style.zIndex = "9999", r.style.pointerEvents = "none", F.forEach((d) => i(g, d[0], d[1])), b.forEach((d) => i(g, d[0], d[1]));
    }, i = function(r, d, h, u) {
      r.clearRect(d - 10, h - 10, 20, 20), r.beginPath(), r.arc(d, h, 10, 0, 2 * Math.PI), u && (r.fillStyle = u), r.fill();
    }, o = function() {
      E === 0 && (O(C), console.error("now is whiteScreen")), w && clearTimeout(w), w = setTimeout(() => {
        E--, n();
      }, 1e3);
    }, c = function(r) {
      const d = s(r);
      let h = !1;
      for (let u = 0; u < p.length; u++)
        if (d.match(p[u])) {
          h = !0;
          break;
        }
      return h;
    }, s = function(r) {
      return r.id ? `#${r.id}` : r.className && typeof r.className == "string" ? `.${r.className.split(" ").filter((d) => !!d).join(".")}` : r.nodeName.toLowerCase();
    }, a = function() {
      const r = document.readyState;
      f || r === "complete" ? n() : window.addEventListener("load", n);
    };
    if (!_()) return !1;
    const {
      debug: m = !0,
      checkPointsNum: P = 17,
      isSkeleton: f = !1,
      loop: T,
      checkAll: k = !1,
      checkList: p = ["#app"],
      onSuccess: M = () => {
      },
      onFail: O = () => {
      }
    } = e;
    let E = f ? T : 0, w = null;
    const y = Math.ceil(P / 2);
    let F = [], b = [];
    const C = {};
    C.checkList = p;
    let g = null;
    const B = () => {
      const r = window.innerWidth / 2, d = window.innerHeight / 2;
      for (let h = 1; h < y; h++)
        b.push([r, window.innerHeight * h / y]), F.push([window.innerWidth * h / y, d]);
    }, $ = (r) => {
      requestIdleCallback ? requestIdleCallback(r) : setTimeout(() => r, 0);
    };
    B(), m && t(), a();
  } catch (n) {
    console.error("white screen check error", n);
  }
};
var l = /* @__PURE__ */ ((e) => (e.NT = "navigation-timing", e.FP = "first-paint", e.FCP = "first-contentful-paint", e.LCP = "largest-contentful-paint", e.CCP = "custom-contentful-paint", e.FID = "first-input-delay", e.RL = "resource-flow", e.CLS = "cumulative-layout-shift", e.FPS = "fps", e.ACT = "api-complete-time", e.TTFB = "time-to-first-byte", e.DI = "device-information", e.NI = "network-information", e.PI = "page-information", e))(l || {});
let L = document.visibilityState === "hidden" ? 0 : 1 / 0;
const v = (e, n) => {
  var t;
  try {
    if ((t = PerformanceObserver.supportedEntryTypes) != null && t.includes(e)) {
      const i = new PerformanceObserver((o) => o.getEntries().map((c) => n(c)));
      return i.observe({ type: e, buffered: !0 }), i;
    }
  } catch (i) {
    throw i;
  }
}, S = (e, n = !0) => {
  const t = (i) => {
    e(i), n && (window.removeEventListener("pagehide", t), window.removeEventListener("visibilitychange", t));
  };
  window.addEventListener("pagehide", t), window.addEventListener("visibilitychange", t);
}, H = (e) => {
  document.prerendering ? document.addEventListener("prerenderingchange", e, {
    once: !0
  }) : e();
}, D = () => (S((e) => {
  L = Math.min(L, e.timeStamp);
}, !0), {
  get timeStamp() {
    return L;
  }
}), z = (e, n = !0) => {
  window.addEventListener("click", e, { once: !0 }), window.addEventListener("keydown", e, { once: !0 });
}, X = () => {
  const e = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  if (e && e.responseStart > 0 && e.responseStart < performance.now())
    return e;
}, Y = (e, n) => {
  let t = { value: 0, entries: [] };
  const i = (s) => {
    s.hadRecentInput || (t.value += s.value, t.entries.push(s));
  }, o = v("layout-shift", i);
  S(() => {
    if (o) {
      o != null && o.takeRecords && o.takeRecords().map(i), o == null || o.disconnect();
      const s = {
        name: l.CLS,
        value: t.value,
        entires: t.entries
      };
      e.set(l.CLS, s), n(s);
    }
  });
};
function G(e, n) {
  if (!window.performance)
    return;
  const t = {
    name: l.DI,
    //@ts-ignore
    memory: window.performance.memory,
    eventCounts: window.performance.eventCounts,
    timing: window.performance.timing,
    navigation: window.performance.navigation,
    timeOrigin: window.performance.timeOrigin
  };
  return e.set(l.DI, t), n(t), t;
}
function J(e, n) {
  if (!window.PerformanceObserver)
    return;
  new Promise((i, o) => {
    const s = v("paint", (a) => {
      a.name === l.FCP && (s && s.disconnect(), i(a));
    });
  }).then((i) => {
    const o = {
      name: l.FCP,
      time: i.startTime,
      entries: [i]
    };
    e.set(l.FCP, o), n(o);
  }).catch((i) => {
    console.log(i);
  });
}
const K = (e, n) => {
  const t = { name: l.FID, value: 0, entries: [] }, i = D();
  H(() => {
    const o = (a) => {
      a.startTime < i.timeStamp && (t.value = a.processingStart - a.startTime, t.entries.push(a), e.set(t), n(t));
    }, c = v("first-input", o);
    S(() => {
      c && (c.takeRecords && c.takeRecords().forEach(o), c.disconnect());
    });
  });
};
function Q(e, n) {
  if (!window.PerformanceObserver)
    return;
  new Promise((i, o) => {
    const s = v("paint", (a) => {
      a.name === l.FP && (s && s.disconnect(), i(a));
    });
  }).then((i) => {
    const o = {
      name: l.FP,
      time: i.startTime,
      entries: [i]
    };
    e.set(l.FP, o), n(o);
  }).catch((i) => {
    console.log(i);
  });
}
const U = (e, n) => {
  const t = {}, i = D();
  H(() => {
    const o = (a) => {
      a.startTime < i.timeStamp && (t.value = a);
    }, c = v(l.LCP, o);
    let s = () => {
      var m;
      if (!c) return;
      c.takeRecords && c.takeRecords().forEach(o), c == null || c.disconnect();
      const a = {
        name: l.LCP,
        value: (m = t.value) == null ? void 0 : m.startTime,
        entries: [t.value]
      };
      e.set(l.LCP, a), n(a), s = () => {
      };
    };
    S(s), z(s);
  });
};
function Z(e, n) {
  var i;
  if (!((i = window.navigator) != null && i.connection))
    return;
  const t = window.navigator.connection;
  return t.name = l.NT, e.set(l.NT, t), n(t), t;
}
function N(e, n) {
  const { host: t, hostname: i, href: o, protocol: c, origin: s, port: a, pathname: m, search: P, hash: f } = location, { width: T, height: k } = window.screen, p = {
    name: l.PI,
    width: T,
    height: k,
    host: t,
    hostname: i,
    href: o,
    protocol: c,
    origin: s,
    port: a,
    pathname: m,
    search: P,
    hash: f
  };
  return e.set(l.PI, p), n(p), p;
}
const ee = (e, n) => {
  let t = { name: l.TTFB };
  H(() => {
    const i = X();
    i && (t.entries = [i], t.value = Math.max(
      i.responseStart - i.activationStart,
      0
    ), e.set(l.TTFB, t), n(t));
  });
};
let te = class {
  constructor() {
    I(this, "state");
    this.state = /* @__PURE__ */ new Map();
  }
  set(n, t) {
    this.state.set(n, t);
  }
  get(n) {
    return this.state.get(n);
  }
  has(n) {
    return this.state.has(n);
  }
  clear() {
    this.state.clear();
  }
  getValues() {
    return Array.from(this.state).reduce((n, [t, i]) => (n[t] = i, n), {});
  }
};
console.log("this is sth");
let ne;
class se {
  constructor(n) {
    I(this, "immediately");
    const {
      appId: t,
      version: i,
      reportCallback: o,
      immediately: c = !1,
      isCustomEvent: s = !1,
      logFpsCount: a = 5,
      excludeRemotePath: m = [],
      scoreConfig: P = {}
    } = n;
    this.immediately = c;
    const f = new te();
    N(f, o), Z(f, o), G(f, o), U(f, o), Y(f, o), ee(f, o), K(f, o), window.addEventListener("pageshow", () => {
      Q(f, o), J(f, o);
    });
  }
  getCurrentMetrics() {
    return ne.getValues();
  }
}
export {
  se as WebVitals,
  oe as whiteScreenCheck
};
