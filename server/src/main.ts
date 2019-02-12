import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';

import { bootstrap } from './api/bootstrapper';
import { errorMiddleware } from './middlewares/error';

const API_VERSIONING = 'v1';

const createApplication = (): Koa => new Koa();
const createAppRouter = (): Router =>
  new Router({
    prefix: `/api/${API_VERSIONING}`
  });

const app = createApplication();
const router = createAppRouter();

bootstrap(router);

app
  .use(errorMiddleware())
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.routes());

app.listen(7777, () => console.log(`Server is running on 7777 port`));
