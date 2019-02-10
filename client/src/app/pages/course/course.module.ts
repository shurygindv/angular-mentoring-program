import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {MaterialUiModule} from '../../shared/material-ui.module';
import {SharedModule} from '../../shared/shared.module';
import {CourseListComponent} from './components/course-list/course-list.component';
import {CourseRoutingModule} from './course-routing.module';
import {CourseComponent} from './course.component';
import {OrderByCoursePipe} from './order-by-course.pipe';
import {CourseEditPageComponent} from './pages/course-edit-page.component';

@NgModule({
  declarations: [
    CourseEditPageComponent,
    CourseComponent,
    CourseListComponent,
    OrderByCoursePipe,
  ],
  imports: [CommonModule, MaterialUiModule, SharedModule, CourseRoutingModule],
})
export class CourseModule {}
