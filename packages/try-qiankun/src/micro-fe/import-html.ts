export const importHTML = async (url: string) => {
  const html = await fetch('/api').then(res => res.text());
  const template = document.createElement('div');
  template.innerHTML = '<p>hellddddo</p>'

  function getExternalScripts() {

  }

  function execScripts () {

  }
  console.log('===', template)
  return {
    template,
    getExternalScripts,
    execScripts
  }
}
