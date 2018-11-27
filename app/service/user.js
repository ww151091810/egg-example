/**
 * author: wangwei
 * 2018.11.26
 * version: 1.0
 * 用户登陆登出及其他权限
 */
'use strict';

const Service = require('egg').Service

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async find(username, password) {
    const user = await this.app.mysql.select('user_tb1', { user_name: username, user_password: password });
    if(user.length == 0)
      return false

    return user[0]
  }
}

module.exports = UserService