import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {CourseService as ICourseService} from './course-service.interface';
import {Course} from '../../models/course.interface';
import {mockCourses} from '../../mocks/course.mock';



@Injectable({
    providedIn: 'root',
})
export class CourseService implements ICourseService  {

    public fetchCourses(): Observable<Course[]> {
        return of(mockCourses);
    }
}
