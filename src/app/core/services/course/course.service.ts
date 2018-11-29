import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ICourse } from '@app/core/models/course.model';
import { mockCourses } from '@app/core/mocks/courses.mock';

import { AbstractCourseService } from './abstract-course.service';

@Injectable({
    providedIn: 'root',
  })
export class CourseService implements AbstractCourseService {
    public fetchCourses (): Observable<ICourse[]> {
        return of(mockCourses);
    }
}
