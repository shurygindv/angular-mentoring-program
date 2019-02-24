import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

// courses
import {CourseStoreEffects} from './effects';
import {courseReducer} from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('courses', courseReducer),
    EffectsModule.forFeature([CourseStoreEffects]),
  ],
  providers: [CourseStoreEffects],
})
export class CourseStoreModule {}
