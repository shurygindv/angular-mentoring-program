import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import {authorAdapter, State} from './state';
import { Author } from '../../core/models/author.interface';

export const getError = (state: State): string => state.error;
export const getIsFetching = (state: State): boolean => state.isFetching;
export const getCurrentAuthor = (state: State): Author | null => state.current;

export const selectAuthorState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('courses');

export const selectAllAuthors: (
  state: object,
) => Author[] = authorAdapter.getSelectors(selectAuthorState).selectAll;

export const selectCourseById = (id: number) =>
  createSelector(
    selectAllAuthors,
    (authors: Author[]) => {
      return (authors || []).find((author: Author) => author.id === id) || null;
    },
  );


export const selectCurrentAuthor  = createSelector(
  selectAuthorState,
  getCurrentAuthor
);

export const selectCourseError: MemoizedSelector<
  object,
  string
> = createSelector(
  selectAuthorState,
  getError,
);

export const selectCourseIsFetching: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectAuthorState,
  getIsFetching,
);
