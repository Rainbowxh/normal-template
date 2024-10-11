/**
 * 实现 BEM 规范
 * block 代码块  element 元素  modifier 装饰
 * e-button
 * e-button__element
 * e-button__element--disabled
 */

export function createNamespace(name: string) {
  const prefixName = `e-${name}`;

  return createBEM(prefixName);
}


function _bem(
  prefixName: string,
  blockSuffix: string,
  element: string,
  modifier: string
) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`;
  }

  if (element) {
    prefixName += `__${element}`;
  }

  if (modifier) {
    prefixName += `--${modifier}`;
  }

  return prefixName;
}

function createBEM(prefixName: string) {
  const b = (blockSuffix?: string) => _bem(prefixName, blockSuffix || "", "", "");
  const e = (element: string) => element ? _bem(prefixName, "", element, "") : '';
  const m = (modifier: string) =>
    modifier ? _bem(prefixName, "", "", modifier) : ''

  const be = (blockSuffix: string, element: string) =>
    (blockSuffix && element) ? _bem(prefixName, blockSuffix, element, ""): ''
  const bm = (blockSuffix: string, modifier: string) =>
    (blockSuffix && modifier) ? _bem(prefixName, blockSuffix, "", modifier) : ''
  const em = (element: string, modifier: string) =>
    (element && modifier) ? _bem(prefixName, "", element, modifier) : ''
  const bem = (blockSuffix: string, element: string, modifier: string) =>
    (blockSuffix && element && modifier) ? _bem(prefixName, blockSuffix, element, modifier) : ''

  const is = (name: string, state: any) => state ? `is-${name}` : ''

  return {
    b,
    e,
    m,
    em,
    be,
    bm,
    bem,
    is
  };
}

const b = createBEM('button')
// console.log(b.b('box'))
// console.log(b.e('element'))
// console.log(b.m('modifier'))
// console.log(b.be('box', 'element'))
// console.log(b.bm('box', 'modifier'))
// console.log(b.bem('box','element' , 'modifier'))
// console.log(b.is('checked', true))
