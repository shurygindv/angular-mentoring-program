import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CourseService} from './services/course/course.service';
import {AuthService} from './services/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [CourseService, AuthService],
})
export class CoreModule {}
