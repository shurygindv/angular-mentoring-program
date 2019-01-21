import * as R from 'ramda';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {CourseService as ICourseService} from './course-service.interface';
import {Course} from '../../models/course.interface';
import {mockCourses} from '../../mocks/course.mock';
import {ICrud} from '../../types';

const toString = (key: number) => `_${key}`;

@Injectable({
  providedIn: 'root',
})
export class CourseService implements ICourseService, ICrud<Course> {
  private id: number;
  private store: Map<string, Course> = new Map(
    R.map((item: Course) => R.pair(toString(item.id), item), mockCourses),
  );

  public create(course: Course): Course {
    this.id++;

    this.store.set(toString(this.id), course);

    return course;
  }

  public getById(id: string): Course {
    return {...this.store.get(id)};
  }

  public update(id: string, course: Course) {
    this.store.set(id, course);
  }

  public delete(id: string): void {
    console.log(`DELETE BY ID: ${id}`);
    this.store.delete(id);
  }

  public fetchCourses(): Observable<Course[]> {
    return of(Array.from(this.store.values()));
  }
}
