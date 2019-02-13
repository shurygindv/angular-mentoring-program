import * as Koa from 'koa';
import * as Router from 'koa-router';

import { HttpSuccessResult } from '../../helpers/http-success-result';
import { ICourseService } from './course-service';

const selectId = (ctx: Koa.Context): number => +ctx.params.id;
const selectTake = (ctx: Koa.Context) => ctx.query.take || 10;
const selectFrom = (ctx: Koa.Context) => ctx.query.from || 0;

export const mount = (courseService: ICourseService): Router => {
  const router: Router = new Router();

  // todo mapping business model / service model
  router.post('/courses/add', async (ctx: Koa.Context) => {
    const { name, isTopRated, date, length, description } = ctx.request.body;
    const courses = await courseService.addCourse({
      name: name,
      isTopRated: isTopRated,
      date: date,
      length: length,
      description: description
    });

    ctx.body = new HttpSuccessResult(courses).result;
    ctx.status = 200;
  });

  router.put('/courses/update/:id', async (ctx: Koa.Context) => {
    const id: number = selectId(ctx);
    const { name, isTopRated, date, length, description } = ctx.request.body;

    const courses = await courseService.updateCourseById(id, {
      id,
      name: name,
      isTopRated: isTopRated,
      date: date,
      length: length,
      description: description
    });

    ctx.body = new HttpSuccessResult(courses).result;
    ctx.status = 200;
  });

  router.delete('/courses/delete/:id', async (ctx: Koa.Context) => {
    const status: boolean = await courseService.deleteCourseById(selectId(ctx));

    ctx.body = new HttpSuccessResult(status).result;
    ctx.status = 204;
  });

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
