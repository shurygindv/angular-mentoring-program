import {Component, Input} from '@angular/core';

import {Course} from '../../../../core/models/course.interface';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() public items: Course[];

  public getCourseClasses(course: Course) {
    const isFavorite = course.topRated;

    return {
      'course-list__item--whited': !isFavorite,
      'course-list__item--favorite': isFavorite,
    };
  }
}
