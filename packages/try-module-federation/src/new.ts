import { convertImportsToRequire } from "./util";

async function loadTemplate() {
  const res = await fetch('http://localhost:3150/packages/vue-component/dist/vue-component.es.js').then(res => res.json())
  const js = convertImportsToRequire(res?.data);
  console.log(js)
  const module = { export: {} };
  const exports = module.export
  let fakeWindow: any = { vue: {} };
  (
    function(module: any,export: any ,window: any) {
        //@ts-ignore
        (0,eval).call(null, js)
    }
  )(module,exports, fakeWindow)
}
