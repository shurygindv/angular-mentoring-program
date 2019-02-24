import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {Course} from '../../core/models/course.interface';

export const courseAdapter = createEntityAdapter<Course>();

export interface State extends EntityState<Course> {
  isFetching?: boolean;
  error?: any;
}

export const initialState: State = courseAdapter.getInitialState({
  isFetching: false,
  error: null,
});
