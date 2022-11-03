const fs = require('fs')
const KoaRouter = require('koa-router')
const mime = require('mime');
const { sleep } = require('../util');
// 2.生成路由器对象
const router = new KoaRouter()

//测试接口
router.get('/test', async (ctx) => {
  // 1.获取请求参数
  // 2.处理请求数据
  // 3.返回响应数据
  await sleep(5000)
  ctx.success({ a: 123 }, '获取成功', 0)
})

router.get('/download', async (ctx, next) => {
  let filePath = 'C:/Users/lucklin/Desktop/赵治林 - HTML5全栈.pdf'
  let file = fs.readFileSync(filePath)
  console.info('file-------', file)

  let fileName = filePath.split('/').pop()
  ctx.set("Access-Control-Expose-Headers", "Content-Disposition")
  ctx.set('Content-Type', mime.getType(fileName))
  ctx.set('Content-Disposition', 'attachment;filename=' + encodeURIComponent(fileName))

  ctx.body = file
})

// 向外暴露路由器对象
module.exports = router