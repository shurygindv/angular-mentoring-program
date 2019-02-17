import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {CourseService} from './services/course/course.service';
import {AuthService} from './services/auth/auth.service';
import {DialogModule} from './services/dialog/dialog.module';
import {ApiService} from './services/api.service';
import {LoaderService} from './services/loader/loader.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, DialogModule, HttpClientModule],
  providers: [ApiService, CourseService, AuthService, LoaderService],
  exports: [DialogModule],
})
export class CoreModule {}
