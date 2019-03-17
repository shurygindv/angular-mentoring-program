import * as Koa from 'koa';
import * as Router from 'koa-router';

import { IAuthorService } from './author-service';
import { HttpResult } from '../../helpers/http-result';

const selectId = (ctx: Koa.Context): string => ctx.params.id;

export const mount = (authorService: IAuthorService): Router => {
  const router: Router = new Router();

  router.get('/authors', async (ctx: Koa.Context) => {
      const authors = await authorService.findAuthors();

      ctx.body = HttpResult.success(authors);
      ctx.status = 200;
  });

  router.get('/authors/:id', async (ctx: Koa.Context) => {
    const author = await authorService.findAuthorById(selectId(ctx));

    ctx.body = HttpResult.success(author);
    ctx.status = 200;
  });

  router.post('/authors/add', async (ctx: Koa.Context) => {
    const { firstName, lastName } = ctx.request.body;
    const author = await authorService.addAuthor({
      firstName,
      lastName
    });

    ctx.body = HttpResult.success(author);
    ctx.status = 200;
  });

  return router;
};
