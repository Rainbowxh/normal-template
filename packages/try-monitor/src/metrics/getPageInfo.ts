import { metricsName } from "../enums";

export default function getPageInfo(store: any, report: any) {
  const { host, hostname, href, protocol, origin, port, pathname, search, hash } = location;
  const { width, height } = window.screen;

  const result = {
    width,
    height,
    host, 
    hostname, 
    href, 
    protocol,
    origin, 
    port, 
    pathname, 
    search, 
    hash
  }

  store.set(metricsName.PI, result)

  report(result);

  return result
}
