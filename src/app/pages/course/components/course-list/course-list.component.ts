import {Component, Input, EventEmitter, Output} from '@angular/core';

import {Course} from '../../../../core/models/course.interface';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() public items: Course[];
  @Input() public searchBy: string;

  @Output() public remove: EventEmitter<Course> = new EventEmitter();
  @Output() public edit: EventEmitter<Course> = new EventEmitter();

  public getCourseClasses(course: Course) {
    const isFavorite = course.topRated;

    return {
      'course-list__item--whited': !isFavorite,
      'course-list__item--favorite': isFavorite,
    };
  }

  public handleClickOnRemove (item: Course) {
    this.remove.emit(item);
  }

  public handleClickOnEdit (item: Course) {
    this.edit.emit(item);
  }
}
