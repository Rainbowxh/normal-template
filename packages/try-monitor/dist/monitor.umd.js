(function(d,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(d=typeof globalThis<"u"?globalThis:d||self,o(d.monitor={}))})(this,function(d){"use strict";var H=Object.defineProperty;var M=(d,o,u)=>o in d?H(d,o,{enumerable:!0,configurable:!0,writable:!0,value:u}):d[o]=u;var w=(d,o,u)=>M(d,typeof o!="symbol"?o+"":o,u);var o=(e=>(e.NT="navigation-timing",e.FP="first-paint",e.FCP="first-contentful-paint",e.LCP="largest-contentful-paint",e.CCP="custom-contentful-paint",e.FID="first-input-delay",e.RL="resource-flow",e.CLS="cumulative-layout-shift",e.FPS="fps",e.ACT="api-complete-time",e.DI="device-information",e.NI="network-information",e.PI="page-information",e))(o||{});let u=document.visibilityState==="hidden"?0:1/0;const m=(e,i)=>{var n;try{if((n=PerformanceObserver.supportedEntryTypes)!=null&&n.includes(e)){const t=new PerformanceObserver(r=>r.getEntries().map(i));return t.observe({type:e,buffered:!0}),t}}catch(t){throw t}},p=(e,i=!0)=>{const n=t=>{e(t),i&&(window.removeEventListener("pagehide",n),window.removeEventListener("visibilitychange",n))};window.addEventListener("pagehide",n),window.addEventListener("visibilitychange",n)},b=()=>(p(e=>{u=Math.min(u,e.timeStamp)},!0),{get timeStamp(){return u}}),S=e=>(console.log("有用吗"),m("layout-shift",n=>{n.hadRecentInput||(e.value+=n.value)})),y=(e,i)=>{let n={value:0};const t=S(n);p(()=>{if(t){t!=null&&t.takeRecords&&t.takeRecords().map(s=>{s.hadRecentInput||(n.value+=s.value)}),t==null||t.disconnect();const c={name:o.CLS,value:n.value};e.set(o.CLS,c),i(c)}})};function F(e,i){if(!window.performance)return;const n={memory:window.performance.memory,eventCounts:window.performance.eventCounts,timing:window.performance.timing,navigation:window.performance.navigation,timeOrigin:window.performance.timeOrigin};return e.set(o.DI,n),i(n),n}function T(e,i){if(!window.PerformanceObserver)return;new Promise((t,r)=>{const s=m("paint",a=>{a.name===o.FCP&&(s&&s.disconnect(),t(a))})}).then(t=>{const r={name:o.FCP,time:t.startTime,raw:t};e.set(o.FCP,r),i(r)}).catch(t=>{console.log(t)})}function I(e,i){if(!window.PerformanceObserver)return;new Promise((t,r)=>{const s=m("paint",a=>{a.name===o.FP&&(s&&s.disconnect(),t(a))})}).then(t=>{const r={name:o.FP,time:t.startTime,raw:t};e.set(o.FP,r),i(r)}).catch(t=>{console.log(t)})}const E=(e,i)=>{const n={},t=s=>{n.value=s},r=m(o.LCP,t);let c=()=>{var s;if(r&&(r.takeRecords&&r.takeRecords().forEach(a=>{const h=b();a.startTime<h.timeStamp&&(n.value=a)}),n.value)){r==null||r.disconnect();const a={name:o.LCP,value:(s=n.value)==null?void 0:s.startTime};e.set(o.LCP,a),i(a),c=()=>{}}};p(c),window.addEventListener("click",c,{once:!0}),window.addEventListener("keydown",c,{once:!0})};function k(e,i){var t;if(!((t=window.navigator)!=null&&t.connection))return;const n=window.navigator.connection;return e.set(o.NT,n),i(n),n}function R(e,i){const{host:n,hostname:t,href:r,protocol:c,origin:s,port:a,pathname:h,search:g,hash:P}=location,{width:C,height:L}=window.screen,l={width:C,height:L,host:n,hostname:t,href:r,protocol:c,origin:s,port:a,pathname:h,search:g,hash:P};return e.set(o.PI,l),i(l),l}let O=class{constructor(){w(this,"state");this.state=new Map}set(i,n){this.state.set(i,n)}get(i){return this.state.get(i)}has(i){return this.state.has(i)}clear(){this.state.clear()}getValues(){return Array.from(this.state).reduce((i,[n,t])=>(i[n]=t,i),{})}};console.log("this is sth");let D;class v{constructor(i){w(this,"immediately");const{appId:n,version:t,reportCallback:r,immediately:c=!1,isCustomEvent:s=!1,logFpsCount:a=5,apiConfig:h={},hashHistory:g=!0,excludeRemotePath:P=[],maxWaitCCPDuration:C=30*1e3,scoreConfig:L={}}=i;this.immediately=c;const l=new O,f=x=>{console.log(x)};R(l,f),k(l,f),F(l,f),E(l,f),y(l,f),window.addEventListener("pageshow",()=>{I(l,f),T(l,f)})}getCurrentMetrics(){return D.getValues()}}new v({}),d.WebVitals=v,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});