const path = require('path')
// 引入依赖包
const Koa = require('koa')
//导入post请求参数处理的插件
const bodyParser = require('koa-bodyparser');
// 引入静态资源中间件，静态web服务
const staticResource = require('koa-static');
// 处理跨域
const cors = require('koa2-cors')

const router = require('./router/index')
const { routerResponse } = require('./middleware/routerResponse')

// 1.生成应用实例
const app = new Koa()

// 3.声明使用中间件
app
  .use(cors({
    origin: function (ctx) {
      return '*'; // 允许来自所有域名请求
    }
  }))
  .use(routerResponse())
  .use(router.routes()) //声明使用路由
  .use(router.allowedMethods()) //声明使用路由的方法
  .use(bodyParser())
  .use(staticResource(path.join(__dirname, 'client')))
  


// 4.监听端口号
app.listen('3001', (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('服务器启动成功')
  console.log('服务器地址:http://localhost:3001')
})
