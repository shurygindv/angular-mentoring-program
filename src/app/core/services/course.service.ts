import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Course } from '../models';
import { IService } from '../core.types';
import { mockCourses } from '../mocks/courses.mock';

export interface ICourseService extends IService {}

@Injectable({
    providedIn: 'root',
  })
export class CourseService implements ICourseService {
    public fetchCourses (): Observable<Course[]> {
        return of(mockCourses);
    }
}
