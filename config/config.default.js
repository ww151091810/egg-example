'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.security = {
    csrf: {
      enable: false,
    }
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1543281623288_5752';

  // add your config here
  config.middleware = [];

  //mysql database
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'rootwangwei',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.redis = {
    client: {
      port: 6379, // Redis port 
      host: '127.0.0.1', // Redis host 
      password: 'auth',
      db: 0,
    }
  };

  return config;
};