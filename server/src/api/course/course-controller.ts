import * as Koa from 'koa';
import * as Router from 'koa-router';

import { HttpSuccessResult } from '../../helpers/http-success-result';
import { ICourseService } from './course-service';

const selectId = (ctx: Koa.Context) => ctx.params.id;
const selectTake = (ctx: Koa.Context) => ctx.query.take || 10;
const selectFrom = (ctx: Koa.Context) => ctx.query.from || 0;

export const mount = (courseService: ICourseService): Router => {
  const router: Router = new Router();

  router.get('/courses', async (ctx: Koa.Context) => {
    const [take, from] = [selectTake(ctx), selectFrom(ctx)];

    const courses = await courseService.takeCoursesByLength(from, take);

    ctx.body = new HttpSuccessResult(courses).result;
    ctx.status = 200;
  });

  // tsss it's bad userInfo from authService 'todo users'
  router.get('/courses/:id', async (ctx: Koa.Context) => {
    const course = await courseService.findCourseById(+selectId(ctx));

    ctx.body = new HttpSuccessResult(course).result;
    ctx.status = 200;
  });

 
  return router;
};
