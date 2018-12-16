import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CourseComponent} from './course.component';
import {CourseRoutingModule} from './course-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CourseListComponent} from './components/course-list/course-list.component';

@NgModule({
  declarations: [CourseComponent, CourseListComponent],
  imports: [CommonModule, SharedModule, CourseRoutingModule],
})
export class CourseModule {}
