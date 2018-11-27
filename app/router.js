'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const tokenInterceptor = app.middleware.tokenInterceptor({}, app);

  router.get('/home', tokenInterceptor, controller.home.index);
  router.post('/user/login', controller.user.user.login);
};
