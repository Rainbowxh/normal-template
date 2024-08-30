const { openBlock: a,  createElementBlock: r} = Vue;
const _ = (c, e) => {
  const n = c.__vccOpts || c;
  for (const [t, o] of e)
    n[t] = o;
  return n;
}, s = {}, d = { class: "child" };
function l(c, e) {
  return a(), r("div", d, " Child component ");
}
const m = /* @__PURE__ */ _(s, [["render", l], ["__scopeId", "data-v-1a873a12"]]), p = {
  install(c, e) {
    const n = (e == null ? void 0 : e.name) ?? "vue-component";
    c.component(n, m);
  }
};
export {
  m as componentA,
  p as default
};
