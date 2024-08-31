import { w as a, m as s } from "./utils-BIVb0z51.js";
import { defineComponent as c, ref as o, watch as l, h as m, openBlock as r, createBlock as i, resolveDynamicComponent as u } from "vue";
const d = /* @__PURE__ */ c({
  name: "ElButton",
  __name: "index",
  setup(_) {
    const e = o("dfdf"), t = o();
    return l(e, (n) => {
      t.value = m("div", n);
    }, { immediate: !0 }), setTimeout(() => {
      console.log("doing?>>>"), e.value = "234324423";
    }, 2e3), (n, v) => (r(), i(u(t.value)));
  }
}), p = a(d), f = [p], k = s(f);
export {
  p as ElButton,
  k as default
};
