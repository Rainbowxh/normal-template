import esbuild from 'esbuild'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)

const __dirname = dirname(fileURLToPath(import.meta.url))

const pkg = require(`../package.json`)

const entryPoints = [resolve(__dirname, `../src/index.ts`)]

const outfile = resolve(__dirname, `../dist/test/vite-plugin-cdn.esm.js`)

esbuild
.context({
  entryPoints,
  outfile,
  bundle: true,
  sourcemap: true,
  format: 'esm',
  globalName: pkg.buildOptions?.name,
  platform: 'node',
})
.then(ctx =>  {
  ctx.watch()
})



