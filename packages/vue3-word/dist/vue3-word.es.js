import { openBlock as o, createElementBlock as s } from "vue";
const a = (t, e) => {
  const c = t.__vccOpts || t;
  for (const [n, r] of e)
    c[n] = r;
  return c;
}, _ = {};
function l(t, e) {
  return o(), s("div", null, " this is a test ");
}
const f = /* @__PURE__ */ a(_, [["render", l]]), d = {
  install(t, e) {
    const c = (e == null ? void 0 : e.name) ?? "vue3-word";
    t.component(c, f);
  }
};
export {
  d as default,
  f as test
};
