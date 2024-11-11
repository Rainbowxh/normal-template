process.env.NODE_ENV = "development"

import * as vite from "vite"
import path from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = path.join(fileURLToPath(import.meta.url), "..");


async function startRender() {
  const server = await vite.createServer({
    config: path.join(rootDir, "vite.config.js"),
    mode:'development'
  })
  return await server.listen()
}

function stopRender() {}

function startElectron() {}

function stopEelectron() {

}

function start() {
  startRender()
  startElectron()
}


start()
