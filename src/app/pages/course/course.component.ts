import {Component, Output, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

import {Course} from '../../core/models/course.interface';
import {CourseService} from './../../core/services/course/course.service';
import {DialogConfirmationComponent} from '../../shared/components/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
  @Output() public routes: string[] = ['Courses'];
  @Output() public courses: Course[];

  @Output() public searchBy: string;

  private matDialog: MatDialog;
  private courseService: CourseService;
  private coursesFetchSubscription: Subscription;

  constructor(courseService: CourseService, dialog: MatDialog) {
    this.courseService = courseService;
    this.matDialog = dialog;
  }

  private updateCourses = (courses: Course[]) => {
    this.courses = courses;
  }

  private subscribeToCourses() {
    this.coursesFetchSubscription = this.courseService.courses.subscribe(
      this.updateCourses,
    );
  }

  public fetchCourses() {
    this.courseService.fetchCourses();
  }

  public ngOnInit(): void {
    this.subscribeToCourses();
    this.fetchCourses();
  }

  public ngOnDestroy(): void {
    if (this.coursesFetchSubscription) {
      this.coursesFetchSubscription.unsubscribe();
    }
  }

  public updateSearch(value: string): void {
    this.searchBy = value;
  }

  public showEditingDialog(course: Course) {
    console.log(course);
  }

  public deleteCourse = (id: number) => {
    this.courseService.delete(id);
  }

  public showRemovingDialog(course: Course) {
    this.matDialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Do you really want to delete this course?',
        description: '',

        onCancel: () => console.log('cancel'),
        onConfirm: () => this.deleteCourse(course.id),
      },
    });
  }
}
