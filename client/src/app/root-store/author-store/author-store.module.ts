import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

// authors
import {AuthStoreEffects} from './effects';
import {authorReducer} from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('authors', authorReducer),
    EffectsModule.forFeature([AuthStoreEffects]),
  ],
  providers: [AuthStoreEffects],
})
export class AuthorStoreModule {}
