import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ICourse, ICourseModelApi , CourseModelApi } from '@app/core/models/course.model';
import { mockCourses } from '@app/core/mocks/courses.mock';

import { AbstractCourseService } from './abstract-course.service';

@Injectable({
    providedIn: 'root',
  })
export class CourseService implements AbstractCourseService {
    private mapToCourses (apiModels: ICourseModelApi[]): ICourse[]  {
        return CourseModelApi.mapToCourses(apiModels);
    }

    public fetchCourses (): Observable<ICourse[]> {
        const mapped: ICourse[] = this.mapToCourses(mockCourses);

        return of(mapped);
    }
}
