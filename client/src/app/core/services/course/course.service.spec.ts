import {Observable} from 'rxjs';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {CourseService} from './course.service';
import {ApiService} from '../api.service';

describe(`CourseService`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService, CourseService],
    });
  });

  it('#fetchCourses should return values', (done: DoneFn) => {
    const service: CourseService = TestBed.get(CourseService);

    service.fetchCourses();

    service.courses.subscribe((values: any) => {
      expect(values.length).toBeGreaterThan(0);
      done();
    });
  });
});
