import {Component, Output, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {CourseService} from './../../core/services/course/course.service';
import {Course} from '../../core/models/course.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  @Output() routes: string[] = ['Courses'];
  @Output() courses: Course[];

  private courseService: CourseService;
  private coursesFetchSubscription: Subscription;

  constructor(courseService: CourseService) {
    this.courseService = courseService;

    this.updateCourses = this.updateCourses.bind(this);
  }

  private updateCourses (courses: Course[]) {
    this.courses = courses;
  }

  private fetchCourses(): Subscription {
    return this.courseService.fetchCourses()
      .subscribe(this.updateCourses);
  }

  public ngOnInit(): void {
    this.coursesFetchSubscription = this.fetchCourses();
  }

  public ngOnDestroy(): void {
    this.coursesFetchSubscription.unsubscribe();
  }

}
