import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Action, Store} from '@ngrx/store';

import {RootStoreState} from '../../../root-store';

@Injectable()
export class StoreService {
  private store: Store<RootStoreState.State>;

  constructor(store: Store<RootStoreState.State>) {
    this.store = store;
  }

  public dispatch<V extends Action = Action>(action: V): void {
    this.store.dispatch(action);
  }

  public select<K>(mapFn: (state: RootStoreState.State) => K): Observable<K> {
    return this.store.select(mapFn);
  }
}
