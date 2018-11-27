const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function tokenInterceptor(ctx, next) {
    //获取token
    let token = ctx.cookies.get('token');

    // 获取前端或以其他方式设置的cookie需要设置signed: false属性，避免对它做验签导致获取不到 cookie 的值。
    let username = ctx.cookies.get('username', { signed: false })

    if (token) { //验证token是否为空
      let result = await ctx.service.token.check(token) //解密token

      let { user_id } = result //检查是否有用户
      if (user_id) { //验证客户端token是否合法

        let redis_token = await app.redis.get(username) // 获取redis中的token
        //验证是否为最新的token

        if (token === redis_token) {
          await next();
        } else {
          // 如果不是最新token，则代表用户在另一个机器上进行操作，需要用户重新登录保存最新token
          ctx.body = {
            status: 1,
            message: '您的账号已在其他机器保持登录，如果继续将清除其他机器的登录状态'
          }
        }
      } else {
        // 如果token不合法，则代表客户端token已经过期或者不合法（伪造token）
        ctx.body = {
          status: 1,
          message: '您的登录状态已过期，请重新登录'
        }
      }
    } else {
      // 如果token为空，则代表客户没有登录
      ctx.body = {
        status: 1,
        message: '您还没有登录，请登陆后再进行操作'
      }
    }
  };
}