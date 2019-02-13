import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Course} from '../../models/course.interface';
import {ApiService} from '../api.service';

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

  public getCourseById (id: number): Observable<any> {
    return this.apiService.get(`/courses/${id}`).pipe(map(result => result.Data));
  }

  public delete(id: number): Observable<any> {
    return this.apiService.delete(`/courses/delete/${id}`);
  }

  public fetchCourses(from?: number, take?: number): void {
    const params = new HttpParams();

    params.set('from', `${from || 0}`);
    params.set('take', `${take || 10}`);

    this.apiService.get('/courses', params).pipe(
      map(result => {
        this.coursesBF.next(result.Data);
      }),
    );
  }
}
