import { Component, OnInit } from '@angular/core';

import { ICourse } from '../../../core/models/course.model';
import { AbstractCourseService } from '../../../core/services/course/abstract-course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private courseService: AbstractCourseService;
  private courses: ICourse[];

  constructor(courseService: AbstractCourseService) {
    this.courseService = courseService;
  }

  private updateCourses(courses: ICourse[]): void {
    this.courses = courses;
  }

  public ngOnInit(): void {
    this.fetchCourses();
  }

  public fetchCourses(): void {
    this.courseService.fetchCourses()
      .subscribe(this.updateCourses);
  }

}
