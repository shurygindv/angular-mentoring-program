import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {Course} from '../models';
import {mockCourses} from '../mocks/courses.mock';

@Injectable({
    providedIn: 'root',
  })
export class CourseService {
    public fetchCourses (): Observable<Course[]> {
        return of(mockCourses);
    }
}
