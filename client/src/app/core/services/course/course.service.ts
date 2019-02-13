import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, first} from 'rxjs/operators';

import {Course} from '../../models/course.interface';
import {ApiService} from '../api.service';

interface FetchCoursesParams {
  take?: number;
  from?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesBF: BehaviorSubject<Course[]>;
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
    this.coursesBF = new BehaviorSubject([]);
  }

  get courses(): Observable<Course[]> {
    return this.coursesBF.asObservable();
  }

  public create(course: Course): Observable<any> {
    return this.apiService.post(`/courses/add`, course);
  }

  public update(id: number, course: Course): Observable<any> {
    return this.apiService.put(`/courses/update/${id}`, course);
  }

  public getCourseById(id: number): Observable<any> {
    return this.apiService
      .get(`/courses/${id}`)
      .pipe(map(result => result.Data));
  }

  public delete(id: number): Observable<any> {
    return this.apiService.delete(`/courses/delete/${id}`);
  }

  public fetchCourses(params: FetchCoursesParams = {}): void {
    const take = params.take || 10;
    const from = params.from || 0;

    const query = {
      from: from || 0,
      take: take || 10,
    };

    this.apiService
      .get('/courses', query)
      .pipe(first())
      .subscribe(result => {
        this.coursesBF.next(result.Data);
      });
  }
}
