import { Parser } from "htmlparser2"

export default function vitePluginScriptDefer() {
  return {
    name: 'vite-plugin-script-defer',
    enforce: "pre",
    transformIndexHtml(html) {
      const parser = new Parser({
        onopentag(name, attribs) {
          console.log(name, attribs)
    
        }
      })
      parser.write(html)
      parser.end()
      console.log(html);
    }
  }
}
