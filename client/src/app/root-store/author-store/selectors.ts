import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import {authorAdapter, State} from './state';
import {Author} from '../../core/models/author.interface';

export const getError = (state: State): string => state.error;
export const getIsFetching = (state: State): boolean => state.isFetching;
export const getCurrentAuthor = (state: State): Author | null => state.current;

export const selectAuthorState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('authors');

export const selectAllAuthors: (
  state: object,
) => Author[] = authorAdapter.getSelectors(selectAuthorState).selectAll;

export const selectAuthorById = (id: string) =>
  createSelector(
    selectAllAuthors,
    (authors: Author[]) => {
      return (authors || []).find((author: Author) => author.id === id) || null;
    },
  );

export const selectAuthorsByIds = (id: string[]) =>
  createSelector(
    selectAllAuthors,
    (authors: Author[]) => {
      return authors.reduce(
        (prev: Author[], current: Author) =>
          id.includes(current.id) ? [...prev, current] : prev,
        [],
      );
    },
  );

export const selectCurrentAuthor: MemoizedSelector<
  object,
  Author | null
> = createSelector(
  selectAuthorState,
  getCurrentAuthor,
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