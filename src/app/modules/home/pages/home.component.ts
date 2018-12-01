import { Component, OnInit } from '@angular/core';

import { ICourse } from '../../../core/models/course.model';
import { AbstractCourseService } from '../../../core/services/course/abstract-course.service';

// TODO: make for card own data model, without dependecies front model

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private courseService: AbstractCourseService;

  public courses: ICourse[];

  constructor(courseService: AbstractCourseService) {
    this.courseService = courseService;
  }

  private fetchCourses(): void {
    this.courseService.fetchCourses()
      .subscribe(courses => this.courses = courses);
  }

  public ngOnInit(): void {
    this.fetchCourses();
  }
}
