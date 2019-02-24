import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export const authAdapter = createEntityAdapter();

export interface State extends EntityState<{}> {
  isAuthenticated?: boolean;
  currentUser: any;
  isFetching?: boolean;
  error?: any;
}

export const initialState: State = authAdapter.getInitialState({
  isAuthenticated: false,
  isFetching: false,
  currentUser: null,
  error: null,
});
