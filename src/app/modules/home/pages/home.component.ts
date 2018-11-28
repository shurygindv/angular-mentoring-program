import { Component, OnInit } from '@angular/core';

import { Course } from '../../../core/models';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private courseService: CourseService;
  private courses: Course[];

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  private updateCourses(courses: Course[]): void {
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
