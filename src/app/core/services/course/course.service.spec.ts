import {Observable} from 'rxjs';

import {Course} from '../../models/course.interface';
import {CourseService} from './course.service';

describe(`CourseService`, () => {
  let service: CourseService;

  beforeEach(() => {
    service = new CourseService();
  });

  it('#fetchCourses should return values', (done: DoneFn) => {
    service.fetchCourses();

    service.courses.subscribe(values => {
      expect(values.length).toBeGreaterThan(0);
      done();
    });
  });
});
