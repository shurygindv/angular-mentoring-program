import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import * as authActions from './actions';

import { AuthService } from '../../core/services/auth/auth.service';

@Injectable()
export class AuthStoreEffects {
  private authService: AuthService;
  private actions$: Actions;

  constructor(authService: AuthService, actions$: Actions) {
    this.authService = authService;
    this.actions$ = actions$;
  }

  @Effect()
  public attemptLoginEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.AttemptLoginAction>(
        authActions.ActionTypes.START_ATTEMPT_LOGIN,
    ),
    switchMap(action =>
      this.authService.attemptLogin(action.payload.email, action.payload.password).pipe(
        map(
          _ => new authActions.AttemptLoginSuccessAction()
        ),
        catchError(error =>
          of(new authActions.AttemptLoginErrorAction({error})),
        ),
      ),
    ),
  );

  @Effect()
  public fetchFullUserInfo$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.FetchUserInfoAction>(
        authActions.ActionTypes.START_FETCH_USER_INFO,
    ),
    switchMap(_ =>
      this.authService.getFullUserInfo().pipe(
        map(() => new authActions.FetchUserInfoSuccessAction()),
        catchError(error =>
          of(new authActions.FetchUserInfoErrorAction({error})),
        ),
      ),
    ),
  );

  @Effect()
  public logout$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.LogoutAction>(
        authActions.ActionTypes.LOGOUT,
    ),
    switchMap(_ =>
      of(this.authService.logout()).pipe(
          map(() => new authActions.LogoutAction())
      )
    ),
  );
}
