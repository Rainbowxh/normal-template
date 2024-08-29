import { openBlock as c, createElementBlock as i } from "vue";
function l() {
  console.log("test");
}
const r = (t, s) => {
  const o = t.__vccOpts || t;
  for (const [e, n] of s)
    o[e] = n;
  return o;
}, a = {};
function g(t, s) {
  return c(), i("div", null, " this is a test ");
}
const h = /* @__PURE__ */ r(a, [["render", g]]);
function f() {
  console.log(h);
}
function _() {
  return l(), console.log("this is a test"), console.log("this is a test"), console.log("this is a test"), console.log("this is a test"), console.log("this is a test"), "abc";
}
function p() {
  return console.log("this is a test"), console.log("this is a test"), console.log("this is a test"), console.log("this is a test"), console.log("this is a test"), "abc";
}
export {
  f as showVue,
  _ as test,
  p as test1
};
