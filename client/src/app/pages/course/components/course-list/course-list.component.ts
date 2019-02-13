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

  @Output() public remove: EventEmitter<Course> = new EventEmitter();
  @Output() public edit: EventEmitter<Course> = new EventEmitter();
  @Output() public addMore: EventEmitter<null> = new EventEmitter();

  public getCourseClasses(course: Course) {
    const isFavorite = course.isTopRated;

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

  public onMore () {
    this.addMore.emit(null);
  }
}
