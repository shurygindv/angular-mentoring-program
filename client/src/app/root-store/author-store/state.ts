import {createEntityAdapter, EntityState} from '@ngrx/entity';

import {Author} from '../../core/models/author.interface';

export const authorAdapter = createEntityAdapter<Author>();

export interface State extends EntityState<Author> {
  isFetching?: boolean;
  current: null;
  added: null;
  error?: any;
}

export const initialState: State = authorAdapter.getInitialState({
  isFetching: false,
  current: null,
  added: null,
  error: null,
});
