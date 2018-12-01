import {Component, OnInit, OnDestroy} from '@angular/core';

import {ICourse} from '../../../core/models/course.model';
import {AbstractCourseService} from '../../../core/services/course/abstract-course.service';
import {Subscription} from 'rxjs';

// TODO: make for card own data model, without dependecies front model

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private coursesFetchSubscription: Subscription;

  private courseService: AbstractCourseService;

  public courses: ICourse[];

  constructor(courseService: AbstractCourseService) {
    this.courseService = courseService;
  }

  private fetchCourses(): Subscription {
    return this.courseService.fetchCourses()
      .subscribe(courses => this.courses = courses);
  }

  public ngOnInit(): void {
    this.coursesFetchSubscription = this.fetchCourses();
  }

  public ngOnDestroy(): void {
    this.coursesFetchSubscription.unsubscribe();
  }

}
