import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {CourseStoreModule} from './course-store';
import {AuthStoreModule} from './auth-store';

@NgModule({
  imports: [
    CommonModule,
    AuthStoreModule,
    CourseStoreModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  declarations: [],
})
export class RootStoreModule {}
