import * as Koa from 'koa';
import * as Router from 'koa-router';

import { HttpSuccessResult } from '../../helpers/http-success-result';
import { ICourseService } from './course-service';

const selectId = (ctx: Koa.Context) => ctx.params.id;

export const mount = (courseService: ICourseService): Router => {
  const router: Router = new Router();

  router.post('/courses', async (ctx: Koa.Context) => {
    const courses = await courseService.findCourses();

    ctx.body = new HttpSuccessResult(courses);
    ctx.status = 200;
  });

  // tsss it's bad userInfo from authService 'todo users'
  router.get('courses/:id', async (ctx: Koa.Context) => {
    const userInfo = await courseService.findCourseById(+selectId(ctx));

    ctx.body = new HttpSuccessResult(userInfo);
    ctx.status = 200;
  });

  return router;
};
