import chokidar from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 监视的输出目录
const outputDir = path.join(rootDir, 'dist');

// 监视 .js 文件的变化
const watcher = chokidar.watch(path.join(outputDir), {
  ignored: (path, stats) => stats?.isFile() && !path.endsWith('preload.js'),
  persistent: true,
  ignoreInitial: false, // 忽略首次初始化
});

// 当文件发生变化时执行删除 `export {}` 操作
watcher.on('change', (filePath) => {
  console.log(`File changed: ${filePath}`);
  let content = readFileSync(filePath, 'utf8');
  
  // 删除 export {}
  content = content.replace(/export\s*{\s*};/g, '');
  
  // 写回文件
  writeFileSync(filePath, content, 'utf8');
})
