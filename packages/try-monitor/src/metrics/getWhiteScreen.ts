function isValid() {
  if (!(document as any).elementsFromPoint) {
    console.warn("browser do not support white screen check");
    return false;
  }

  return true;
}
export const initWhiteScreenCheck = (config: any = { checkElements: [], debug: true }) => {
  try {
    if (!isValid()) return false;
    const { 
      debug = true, 
      checkPointsNum = 17, 
      isSkeleton = false, 
      loop, 
      checkAll = false,
      checkList = ['#app'],
      onSuccess = () => {},
      onFail = () => {}
    } = config;
    let _loopTime = isSkeleton ? loop : 0;
    let _loopTimerId: string | number | NodeJS.Timeout | null | undefined = null;
    const pointsNum = Math.ceil(checkPointsNum / 2) 
    let checkPointsX: any = []
    let checkPointsY: any = []
    const result: any = {}
    result.checkList = checkList;
    let ctx: any = null;
  
    const initPoints = () =>  {
      const xMid = window.innerWidth / 2;
      const yMid = window.innerHeight / 2;
  
      for(let i = 1; i < pointsNum; i ++) {
        checkPointsY.push([xMid,(window.innerHeight * i) / pointsNum])
        checkPointsX.push([(window.innerWidth * i) / pointsNum, yMid])
      }
    }
  
    function detectWhiteScreen() {
      // 空闲时候执行，尽量不阻塞当前渲染任务
      onIdle(() => {
        if(!document || !document.elementsFromPoint) {
          console.warn('当前浏览器不支持白屏检测');
        }
        let isWhiteScreen = true;
    
        const points = [...checkPointsX, ...checkPointsY]
    
        for(let i = 0; i < points.length; i++) {
          const target = points[i];
          const name = `point-${target[0]}-${target[1]}`      
          const elements = document.elementsFromPoint(target[0], target[1])
          const path: any = []
          // 当前元素可能在游离元素节点之上(弹窗，广告 需要做特殊处理)
          for(let el of elements) {
            const elSelector = getElementSelector(el);
            path.push(elSelector)
            if(isElementInCheckList(el)) {
              isWhiteScreen = false;
              if(debug) {
                drawDebugPoint(ctx, target[0], target[1], '#00ff00')
              }
              break;
            }else {
              if(debug) {
                drawDebugPoint(ctx, target[0], target[1], '#ff3300')
              }
            }
          }
          
          result[name] = path;

          if(!isWhiteScreen) {
            if(!checkAll) {
              break;
            }
          }
        }
    
        if(isWhiteScreen) {
          // do sth with error situation
          handerWhiteScreenError();
        }else {
          if(_loopTimerId) {
            clearTimeout(_loopTimerId)
          }
          _loopTime = 0;
          onSuccess(result)
        }
      })
    }

    function debugCanvas() {
      const canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.zIndex = "9999";
      canvas.style.pointerEvents = 'none';
      checkPointsX.forEach((item: any) => drawDebugPoint(ctx, item[0], item[1]));
      checkPointsY.forEach((item: any) => drawDebugPoint(ctx, item[0], item[1]));
    }
  
    function drawDebugPoint(ctx: any, x: number, y: number, c?: string) {
      ctx.clearRect(x - 10, y - 10, 10 * 2, 10 * 2);
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      if(c) {
        ctx.fillStyle = c
      }
      ctx.fill();
    }
    
    function handerWhiteScreenError() {
      // 循环零次的时候认为最终失败
      if(_loopTime === 0) {
        onFail(result)
        console.error('now is whiteScreen')
      }
      if(_loopTimerId) {
        clearTimeout(_loopTimerId)
      }
      _loopTimerId = setTimeout(() => {
        _loopTime--;

        detectWhiteScreen();
      }, 1000)
    }

    function isElementInCheckList(el: Element) {
      const selector = getElementSelector(el);
      let isMatch = false;
      for(let i = 0; i < checkList.length; i++) {
        if(selector.match(checkList[i])) {
          isMatch = true;
          break;
        }
      }
      return isMatch
    } 
  
    function getElementSelector(element: Element) {
      return element.id
        ? `#${element.id}`
        : element.className && typeof element.className === "string"
        ? `.${element.className
            .split(" ")
            .filter((c) => !!c)
            .join(".")}`
        : element.nodeName.toLowerCase();
    }
  
    function startDetectWhiteScreen() {
      const readyStatus = document.readyState;
      if(isSkeleton) {
        detectWhiteScreen()
      } else {
        if(readyStatus === 'complete') {
          detectWhiteScreen();
        }else {
          /**
           * The load event is fired when the whole page has loaded, 
           * including all dependent resources such as stylesheets, scripts, iframes, and images, except those that are loaded lazily. This is in contrast to DOMContentLoaded, which is fired as soon as the page DOM has been loaded, without waiting for resources to finish loading. 
           * */
          window.addEventListener('load', detectWhiteScreen)
        }
      }
    }
  
    const onIdle = (callback: any) => {
      if(!!requestIdleCallback) { 
        requestIdleCallback(callback)
      }else {
        setTimeout(() => callback, 0)
      }
    }

    initPoints();
    if(debug) {
      debugCanvas();
    }
    startDetectWhiteScreen();

  }catch (error) {
    console.error('white screen check error', error)
  }
};
