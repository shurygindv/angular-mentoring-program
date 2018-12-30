import {Observable} from 'rxjs';

import {CourseService as ICourseService} from './course-service.interface';
import {Course} from '../../models/course.interface';
import {CourseService} from './course.service';

describe(`CourseService`, () => {
  let service: ICourseService;

  beforeEach(() => {
    service = new CourseService();
  });

  it('#fetchCourses should return values', (done: DoneFn) => {
    const courses: Observable<Course[]> = service.fetchCourses();

    courses.subscribe(values => {
      expect(values.length).toBeGreaterThan(0);
      done();
    });
  });
});
