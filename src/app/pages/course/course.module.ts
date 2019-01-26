import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CourseComponent} from './course.component';
import {CourseRoutingModule} from './course-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CourseListComponent} from './components/course-list/course-list.component';
import {OrderByCoursePipe} from './order-by-course.pipe';
import {MaterialUiModule} from '../../shared/material-ui.module';
import {DialogAddCourseComponent} from './dialogs/add/dialog-add-course.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseListComponent,
    DialogAddCourseComponent,
    OrderByCoursePipe,
  ],
  imports: [CommonModule, MaterialUiModule, SharedModule, CourseRoutingModule],
})
export class CourseModule {}
