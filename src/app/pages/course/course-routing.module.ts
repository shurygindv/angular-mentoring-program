import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CourseComponent} from './course.component';
import {CourseEditPageComponent} from './pages/course-edit-page.component';

const routes: Routes = [
  {path: '', component: CourseComponent},
  {path: ':id', component: CourseEditPageComponent},
  {path: 'new', component: CourseEditPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
