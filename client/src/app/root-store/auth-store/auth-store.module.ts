import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

// courses
import {AuthStoreEffects} from './effects';
import {authReducer} from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthStoreEffects]),
  ],
  providers: [AuthStoreEffects],
})
export class AuthStoreModule {}
