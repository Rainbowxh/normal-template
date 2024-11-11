
const listener = {
  DOMContentLoaded: [
    () => {
      const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
      }
    
      for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
      }
    }
  ]
}

function register() {
  const removeList: any[] = [];

  for(const [eventName, collection] of Object.entries(listener)) {
    for(let func of collection) {
      removeList.push([eventName, func])
      window.addEventListener(eventName, func);
    }
  }

  return () => {
    for(let [eventName, func] of removeList) {
      window.removeEventListener(eventName, func);
    }
  }
}

register();




