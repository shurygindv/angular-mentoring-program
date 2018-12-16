import {CourseService as ICourseService} from './course-service.interface';
import {CourseService} from './course.service';

describe(`CourseService`, () => {
  let service: ICourseService = null;

  beforeEach(() => {
    service = new CourseService();
  });

  it('#fetchCourses should return values', (done: DoneFn) => {
    const courses = service.fetchCourses();

    courses.subscribe(values => {
      expect(values.length).toBeGreaterThan(0);
      done();
    });
  });
});
