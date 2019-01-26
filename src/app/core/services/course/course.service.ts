import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

import {Course} from '../../models/course.interface';
import {mockCourses} from '../../mocks/course.mock';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesBF: BehaviorSubject<Course[]>;
  private currentId: number;
  private store: Course[];

  constructor() {
    this.coursesBF = new BehaviorSubject([]);
    this.store = mockCourses;
  }

  get courses(): Observable<Course[]> {
    return this.coursesBF.asObservable();
  }

  private upToDateCourses(courses: Course[]): void {
    this.store = [...courses];
    this.coursesBF.next(Array.from(this.store));
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

  public update(id: number, course: Course): void {
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
    this.coursesBF.next(Array.from(this.store.values()));
  }
}
