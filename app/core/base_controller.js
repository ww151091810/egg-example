/**
 * author: wangwei
 * 2018.11.12 
 * version 1.0
 */

const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data, msg = '请求成功') {
    this.ctx.body = {
      success: true,
      message: msg,
      backData: data
    };
  }

  error(msg = '请求失败') {
    this.ctx.body = {
      success: false,
      message: msg
    };
  }

  notFound(msg = 'not found') {
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;