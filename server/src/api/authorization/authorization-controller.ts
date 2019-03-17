import * as Koa from 'koa';
import * as Router from 'koa-router';

import { HttpResult } from '../../helpers/http-result';
import { IAuthorizationService } from './authorization-service';

const selectId = (ctx: Koa.Context) => ctx.params.id;
const selectLogin = (ctx: Koa.Context) => ctx.request.body.login;
const selectPassword = (ctx: Koa.Context) => ctx.request.body.password;

export const mount = (authService: IAuthorizationService): Router => {
  const router: Router = new Router();

  router.post('/auth/login', async (ctx: Koa.Context) => {
    const [login, password] = [selectLogin(ctx), selectPassword(ctx)];
    
    const loginData = await authService.login(login, password);

    ctx.body = HttpResult.success(loginData);
    ctx.status = 200;
  });

  // tsss it's bad userInfo from authService 'todo users'
  router.get('/auth/userInfo/:id', async (ctx: Koa.Context) => {
    const userInfo = await authService.findUserById(+selectId(ctx));

    ctx.body = HttpResult.success(userInfo);
    ctx.status = 200;
  });

  return router;
};
