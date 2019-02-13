import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, first} from 'rxjs/operators';

import {Course} from '../../models/course.interface';
import {ApiService} from '../api.service';
import {Response} from '../../types';

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

  public create(course: Course): Observable<Response<Course>> {
    return this.apiService.post(`/courses/add`, course);
  }

  public update(id: number, course: Course): Observable<Response<Course[]>> {
    return this.apiService.put(`/courses/update/${id}`, course);
  }

  public getCourseById(id: number): Observable<Course> {
    return this.apiService
      .get(`/courses/${id}`)
      .pipe(map((res: Response<Course>) => res.Data));
  }

  public delete(id: number): Observable<Response<boolean>> {
    return this.apiService.delete(`/courses/delete/${id}`);
  }

  public filterBy(textFragment: string): Observable<Course[]> {
    return this.apiService
      .get('/courses/filterBy', {
        textFragment,
      })
      .pipe(map((res: Response<Course[]>) => res.Data));
  }

  public fetchCourses(params: FetchCoursesParams = {}): void {
    const query = {
      from: params.from || 0,
      take: params.take || 10,
    };

    this.apiService
      .get('/courses', query)
      .pipe(first())
      .subscribe((res: Response<Course[]>) => {
        this.coursesBF.next(res.Data);
      });
  }
}
