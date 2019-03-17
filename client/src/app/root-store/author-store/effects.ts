import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as authorActions from './actions';

import {RootStoreState} from '..';
import {Author} from '../../core/models/author.interface';
import {AuthorService} from '../../core/services/author/author.service';

@Injectable()
export class AuthStoreEffects {
  private actions$: Actions;
  private store$: Store<RootStoreState.State>;
  private authorService: AuthorService;

  constructor(
    authorService: AuthorService,
    actions$: Actions,
    store$: Store<RootStoreState.State>,
  ) {
    this.actions$ = actions$;
    this.authorService = authorService;
    this.store$ = store$;
  }

  @Effect()
  public fetchAuthorsEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authorActions.FetchAuthorsAction>(
      authorActions.ActionTypes.START_FETCHING_AUTHORS,
    ),
    switchMap(_ =>
      this.authorService.fetchAuthors().pipe(
        map(
          (items: Author[]) =>
            new authorActions.FetchAuthorsSuccessAction({
              items,
            }),
        ),
        catchError(error =>
          of(new authorActions.FetchAuthorsErrorAction({error})),
        ),
      ),
    ),
  );


  @Effect()
  public fetchAuthorByIdEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authorActions.FetchAuthorByIdAction>(
      authorActions.ActionTypes.START_FETCHING_ONE_AUTHOR_BY_ID,
    ),
    switchMap(action =>
      this.authorService.fetchAuthorById(action.payload.id).pipe(
        map(
          (item: Author) =>
            new authorActions.FetchAuthorByIdSuccessAction({item}),
        ),
        catchError(error =>
          of(new authorActions.FetchAuthorByIdErrorAction({error})),
        ),
      ),
    ),
  );
}
