import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
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
    const query = {textFragment};

    return this.apiService
      .get('/courses/filterBy', query)
      .pipe(map((res: Response<Course[]>) => res.Data));
  }

  public fetchCourses(params: FetchCoursesParams = {}): Observable<Course[]> {
    const query = {
      from: params.from || 0,
      take: params.take || 10,
    };

    return this.apiService
      .get('/courses', query)
      .pipe(map((res: Response<Course[]>) => res.Data));
  }
}
