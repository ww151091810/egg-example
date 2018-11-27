/**
 * author: wangwei
 * 2018.11.20
 * version: 1.0
 */
'use strict';

const Controller = require('../../core/base_controller')

class UserController extends Controller {

  async login() {
    const {ctx, app} = this;
    console.log('request.body ===', ctx.request.body);
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const user = await ctx.service.user.find(username, password);
    console.log(user)

    if (user === false) {
      this.error('用户名或密码错误')
    } else {
      const payload = user;
      const time = 600;
      const token = await ctx.service.token.create(payload, time)

      ctx.cookies.set('token', token, {
        maxAge: time * 1000,
        path: '/',
        domain: 'localhost',
        httpOnly: false,
      });

      ctx.cookies.set('username', user.user_name, {
        maxAge: time * 1000,
        path: '/',
        domain: 'localhost',
        httpOnly: false,
      });
      // 保存到redis
      app.redis.set(user.user_name, token)

      this.success({
        username: user.user_name
      }, '登陆成功');
    }
    ctx.type = 'application/json; charset=utf-8';

  }

  async logout() {
    const ctx = this.ctx;
    this.success(undefined, '注销成功')
    ctx.type = 'application/json; charset=utf-8';
  }
}

module.exports = UserController;