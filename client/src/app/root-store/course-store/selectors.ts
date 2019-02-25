import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import {courseAdapter, State} from './state';
import {Course} from '../../core/models/course.interface';

export const getError = (state: State): string => state.error;
export const getIsFetching = (state: State): boolean => state.isFetching;

export const selectCourseState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('courses');

export const selectAllCourses: (
  state: object,
) => Course[] = courseAdapter.getSelectors(selectCourseState).selectAll;

export const selectCourseById = (id: number) =>
  createSelector(
    selectAllCourses,
    (courses: Course[]) => {
      return (courses || []).find((course: Course) => course.id === id) || null;
    },
  );

export const selectCourseError: MemoizedSelector<
  object,
  string
> = createSelector(
  selectCourseState,
  getError,
);

export const selectCourseIsFetching: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectCourseState,
  getIsFetching,
);
