/**
 * author: wangwei
 * 2018.11.26
 * version: 1.0
 * jwt， token签发与验证
 */
'use strict';

const Service = require('egg').Service
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

class TokenService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async create(payload, time) { // Token 数据
    
    const created = Math.floor(Date.now() / 1000);
    // 密钥
    const privateKey = fs.readFileSync(path.join(__dirname,'../public/private.key'));

    // 签发 Token
    const token = jwt.sign({ payload, exp: created + time }, privateKey, { algorithm: 'RS256' })

    // 输出签发的 Token
    return token
  }

  async check(token) {
    // 获取验证 JWT 时需要用的公钥
    const publicKey = fs.readFileSync(path.join(__dirname,'../public/public.key'));
    let res = '';

    try {
      // 验证 Token
      let result = jwt.verify(token, publicKey, { algorithm: 'RS256'}) || {};
      console.log('result ',result)
      let { exp } = result, current = Math.floor(Date.now() / 1000);
      console.log('current ', current)

      if (current <= exp) {
        res = result.payload || {};
      }
    } catch (e) {
      console.log(e);
    }
    return res;
  }
}

module.exports = TokenService;