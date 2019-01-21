import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

import {Course} from '../../models/course.interface';
import {mockCourses} from '../../mocks/course.mock';
import {ICrud} from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CourseService implements ICrud<Course> {
  private _courses: BehaviorSubject<Course[]>;
  private currentId: number;
  private store: Course[];

  constructor() {
    this._courses = new BehaviorSubject([]);
    this.store = mockCourses;
  }

  get courses(): Observable<Course[]> {
    return this._courses.asObservable();
  }

  private upToDateCourses(courses: Course[]) {
    this.store = [...courses];
    this._courses.next(Array.from(this.store));
  }

  public create(course: Course): Course {
    this.currentId++;

    const item = {id: this.currentId, ...course};

    this.upToDateCourses([...this.store, item]);

    return item;
  }

  public getById(id: number): Course {
    const course = this.store.find((item: Course) => item.id === id);

    return {...course};
  }

  public update(id: number, course: Course) {
    const index = this.store.findIndex((item: Course) => item.id === id);

    this.upToDateCourses([
      ...this.store.slice(0, index - 1),
      course,
      ...this.store.slice(index + 1),
    ]);
  }

  public delete(id: number): void {
    this.upToDateCourses(this.store.filter((item: Course) => item.id !== id));
  }

  public fetchCourses(): void {
    this._courses.next(Array.from(this.store.values()));
  }
}
