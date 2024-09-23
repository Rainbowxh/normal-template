import { reroute } from "./navigation/reroute.js";

export let started = false;

export function start() {
  if(started) return;
  // 用户已经被启动
  started = true;

  reroute();
}
