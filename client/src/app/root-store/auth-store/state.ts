import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Response} from '../../core/types';

export const authAdapter = createEntityAdapter();

export interface State extends EntityState<{}> {
  isAuthenticated?: boolean;
  userInfo: any;
  isFetching?: boolean;
  error?: Response<void>;
}

export const initialState: State = authAdapter.getInitialState({
  isAuthenticated: false,
  isFetching: false,
  userInfo: null,
  error: null,
});
