import {Observable} from 'rxjs';

import {Course} from '../../models/course.interface';

export interface CourseService {
  fetchCourses(): Observable<Course[]>;
}
