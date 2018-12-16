import {CourseListComponent} from './course-list.component';
import {ViewChild, Component} from '@angular/core';

@Component({
  selector: `app-host-course-list`,
  template: `
    <app-course-list></app-course-list>
  `,
})
export class HostCourseListComponent {
  @ViewChild(CourseListComponent)
  public underTestComponent: CourseListComponent;
}
