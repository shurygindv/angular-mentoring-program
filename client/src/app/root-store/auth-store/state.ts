import {createEntityAdapter, EntityState} from '@ngrx/entity';

import {Response} from '../../core/types';
import { UserInfo } from '../../core/services/auth/auth.interface';

export const authAdapter = createEntityAdapter();

export interface State extends EntityState<{}> {
  isAuthenticated?: boolean;
  userInfo: UserInfo;
  isFetching?: boolean;
  error?: Response<void>;
}

export const initialState: State = authAdapter.getInitialState({
  isAuthenticated: false,
  isFetching: false,
  userInfo: null,
  error: null,
});
