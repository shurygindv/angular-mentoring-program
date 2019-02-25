import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as authActions from './actions';

import {AuthService} from '../../core/services/auth/auth.service';
import {UserInfo} from '../../core/services/auth/auth.interface';
import { LogoutSuccessAction } from './actions';

@Injectable()
export class AuthStoreEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
  ) {}

  @Effect()
  public attemptLoginEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.AttemptLoginAction>(
      authActions.ActionTypes.START_ATTEMPT_LOGIN,
    ),
    switchMap(action =>
      this.authService
        .attemptLogin(action.payload.email, action.payload.password)
        .pipe(
          tap(() => this.navigateToCourses()),
          map(
            (data: UserInfo) => new authActions.AttemptLoginSuccessAction(data),
          ),
          catchError(error =>
            of(new authActions.AttemptLoginErrorAction(error)),
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
        map(data => new authActions.FetchUserInfoSuccessAction(data)),
        catchError(error =>
          of(new authActions.FetchUserInfoErrorAction(error)),
        ),
      ),
    ),
  );

  @Effect()
  public logout$: Observable<Action | void> = this.actions$.pipe(
    ofType<authActions.LogoutAction>(authActions.ActionTypes.LOGOUT),
    switchMap(_ =>
      of(this.authService.logout()).pipe(
        map(() => new LogoutSuccessAction()),
        tap(() => this.navigateToLogin())
        ),
    ),
  );

  private navigateToCourses(): void {
    this.router.navigateByUrl('/courses');
  }

  private navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
