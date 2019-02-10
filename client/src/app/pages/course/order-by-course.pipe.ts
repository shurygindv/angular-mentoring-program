import {Pipe, PipeTransform} from '@angular/core';

import {Course} from '../../core/models/course.interface';

type fieldWithStringValue<T extends keyof Course> = Course[T] extends String
  ? Course[T]
  : never;

@Pipe({name: 'orderByCourse'})
export class OrderByCoursePipe implements PipeTransform {
  public transform(
    courses: Course[],
    searchBy: string,
    propName: fieldWithStringValue<any>,
  ): Course[] {
    if (!searchBy) {
      return courses;
    }

    const normalizedSearchWord = searchBy.toUpperCase().trim();

    return courses.filter(course =>
      course[propName].toUpperCase().includes(normalizedSearchWord),
    );
  }
}
