import * as Koa from 'koa';
import * as Router from 'koa-router';

import { IAuthorService } from './author-service';
import { HttpSuccessResult } from '../../helpers/http-success-result';

const selectId = (ctx: Koa.Context): string => ctx.params.id;

export const mount = (authorService: IAuthorService): Router => {
  const router: Router = new Router();

  router.get('/authors', async (ctx: Koa.Context) => {
      const authors = await authorService.findAuthors();

      ctx.body = new HttpSuccessResult(authors).result;
      ctx.status = 200;
  });

  router.get('/authors/:id', async (ctx: Koa.Context) => {
    const author = await authorService.findAuthorById(selectId(ctx));

    ctx.body = new HttpSuccessResult(author).result;
    ctx.status = 200;
  });

  return router;
};
