import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {MaterialUiModule} from '../../shared/material-ui.module';
import {SharedModule} from '../../shared/shared.module';
import {CourseListComponent} from './components/course-list/course-list.component';
import {CourseRoutingModule} from './course-routing.module';
import {CourseComponent} from './course.component';
import {CourseEditPageComponent} from './pages/course-edit-page.component';
import {AuthorControlComponent} from './components/author-control/author-control.component';

@NgModule({
  declarations: [
    CourseEditPageComponent,
    CourseComponent,
    CourseListComponent,
    AuthorControlComponent,
  ],
  imports: [CommonModule, SharedModule, MaterialUiModule, CourseRoutingModule],
})
export class CourseModule {}
