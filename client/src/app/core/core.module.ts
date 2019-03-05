import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ApiService} from './services/api.service';
import {AuthService} from './services/auth/auth.service';
import {DialogModule} from './services/dialog/dialog.module';
import {CourseService} from './services/course/course.service';
import {LoaderService} from './services/loader/loader.service';
import {AuthorService} from './services/author/author.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, DialogModule, HttpClientModule],
  providers: [
    ApiService,
    CourseService,
    AuthService,
    LoaderService,
    AuthorService,
  ],
  exports: [DialogModule],
})
export class CoreModule {}
