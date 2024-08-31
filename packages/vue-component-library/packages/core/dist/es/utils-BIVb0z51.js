function n(a) {
  return (s) => a.forEach((l) => {
    s.use(l);
  });
}
const r = (a) => (a.install = (t) => {
  const s = a.name;
  t.component(s, a);
}, a);
export {
  n as m,
  r as w
};
