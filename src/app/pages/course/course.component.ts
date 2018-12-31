import {Component, Output, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {CourseService} from './../../core/services/course/course.service';
import {Course} from '../../core/models/course.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
  @Output() public routes: string[] = ['Courses'];
  @Output() public courses: Course[];

  @Output() public searchBy: string;

  private courseService: CourseService;
  private coursesFetchSubscription: Subscription;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
    this.updateCourses = this.updateCourses.bind(this);
  }

  private updateCourses(courses: Course[]) {
    this.courses = courses;
  }

  public fetchCourses(): Subscription {
    return this.courseService.fetchCourses().subscribe(this.updateCourses);
  }

  public ngOnInit(): void {
    this.coursesFetchSubscription = this.fetchCourses();
  }

  public ngOnDestroy(): void {
    if (this.coursesFetchSubscription) {
      this.coursesFetchSubscription.unsubscribe();
    }
  }

  public updateSearch(value: string) {
    this.searchBy = value;
  }
}
