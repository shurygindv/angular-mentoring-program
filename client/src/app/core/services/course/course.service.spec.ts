import {Observable} from 'rxjs';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {CourseService} from './course.service';
import {ApiService} from '../api.service';
import { Course } from '../../models/course.interface';

describe(`CourseService`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService, CourseService],
    });
  });

  it('.filterBy should work', (done: DoneFn) => {
    const service: CourseService = TestBed.get(CourseService);

    service.filterBy('').subscribe((values: Course[]) => {
      expect(values.length).toBeGreaterThan(0);
      done();
    });
  });
});
