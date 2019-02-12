import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

import {Course} from '../../../../core/models/course.interface';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
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

  public onRemove(item: Course) {
    this.remove.emit(item);
  }

  public onEdit(item: Course) {
    this.edit.emit(item);
  }
}