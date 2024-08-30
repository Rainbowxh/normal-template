const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const util = require('util');


const app = new Koa();

// 将 fs.stat 和 fs.readFile 转换为 promise 以便使用 async/await
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);

// 本地目录路径
const localDir = path.resolve(__dirname,'..','..');

app.use(async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // 检查请求路径是否以 /xxx 开头
  if (ctx.path.startsWith('/')) {
    // 获取本地文件路径
    const filePath = path.join(localDir, ctx.path.replace('/', ''));
    try {
      // 检查文件是否存在
      const fileStat = await stat(filePath);
      if (fileStat.isFile()) {
        // 设置内容类型
        ctx.type = path.extname(filePath);
        // 读取文件内容并响应
        ctx.body = await readFile(filePath);
      } else {
        ctx.status = 404;
        ctx.body = 'Not Found';
      }
    } catch (err) {
      ctx.status = 404;
      ctx.body =  JSON.stringify(err);
    }
  } else {
    ctx.status = 404;
    ctx.body = 'Not Found';
  }
});

app.listen(3150, () => {
  console.log('File server is running at http://localhost:3150');
});
