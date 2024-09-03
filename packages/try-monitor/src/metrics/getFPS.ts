/**
 * FPS = 1s / 每秒画面帧数
 * @returns 
 */
export const monitorFPS = (store: any, callback: any) => {
  const result = {}

  let timerId: number | null = null;

  const start = () => {
    let timeStampCount = 0;
    let startTime = new Date().getTime();
    
    const calc = () => {
      const endTime =  new Date().getTime();
      timeStampCount += 1;
      if(endTime - startTime < 1000 - 4) {
        timerId = requestAnimationFrame(calc)
      }else {
        callback(timeStampCount)
        timeStampCount = 0;
        startTime = new Date().getTime();
        requestAnimationFrame(calc)
      }
    }
    calc();
  }
  const stop = () => {
    if(timerId) {
      cancelAnimationFrame(timerId)
    }
  }
  return {
    start, 
    stop,
    result,
  }
}
