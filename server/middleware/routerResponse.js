function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data, msg, code) {
      ctx.type = option.type || 'json'
      ctx.body = {
        data: data || {},
        msg: msg || '成功',
        code: code || option.successCode || 0,
        status: true
      }
    }

    ctx.fail = function (code, msg) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.errorCode || 0,
        msg: msg || '失败',
        status: false
      }
    }

    await next()
  }
}
module.exports = {
  routerResponse
}
