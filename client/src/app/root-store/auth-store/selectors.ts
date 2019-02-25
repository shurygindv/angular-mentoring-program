import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import {State} from './state';
import {Response} from '../../core/types';

export const getError = (state: State): Response<void> =>
  state.error || ({} as Response<void>);
export const getUserInfo = (state: State): any => state.userInfo;
export const getIsFetching = (state: State): boolean => state.isFetching;
export const getAuthFlag = (state: State): boolean => state.isAuthenticated;

export const selectAuthState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('auth');

export const selectAuthError: MemoizedSelector<object, string> = createSelector(
  selectAuthState,
  getError,
  (state: State) => getError(state).ErrorDescription,
);

export const selectUserInfo: MemoizedSelector<object, string> = createSelector(
  selectAuthState,
  getUserInfo,
);

export const selectAuthFlag: MemoizedSelector<object, boolean> = createSelector(
  selectAuthState,
  getAuthFlag,
);

export const selectAuthIsFetching: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectAuthState,
  getIsFetching,
);
