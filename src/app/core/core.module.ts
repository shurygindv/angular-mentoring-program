import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CourseService} from './services/course/course.service';
import {AuthService} from './services/auth/auth.service';
import { DialogModule } from './services/dialog/dialog.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DialogModule],
  providers: [CourseService, AuthService],
})
export class CoreModule {}
