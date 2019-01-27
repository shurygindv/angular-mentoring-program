import {Component, Output, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {Course} from '../../core/models/course.interface';
import {CourseService} from './../../core/services/course/course.service';
import {DialogService} from '../../core/services/dialog/dialog.service';
import {
  ICourseEditDialogData,
  CourseSharedData,
} from './dialogs/edit/course-edit-dialog.component';
import {Omit} from '../../utils/types';
import {CourseEditDialogComponent} from './dialogs/edit/course-edit-dialog.component';

const mapCourseToDialogData = (
  course: Course,
): Omit<ICourseEditDialogData, 'onSubmit'> => ({
  title: course.title,
  topRated: course.topRated,
  duration: course.duration,
  description: course.description,
  creationDate: course.creationDate,
});

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
  private dialogService: DialogService;
  private coursesFetchSubscription: Subscription;

  constructor(courseService: CourseService, dialogService: DialogService) {
    this.courseService = courseService;
    this.dialogService = dialogService;
  }

  private updateCourses = (courses: Course[]) => {
    this.courses = courses;
  }

  private subscribeToCourses() {
    this.coursesFetchSubscription = this.courseService.courses.subscribe(
      this.updateCourses,
    );
  }

  private updateCourseById(id: number, course: Course) {
    this.courseService.update(id, course);
  }

  private handleEditingSubmit(id: number, dialogData: CourseSharedData) {
    this.updateCourseById(id, CourseSharedData.toCourse(dialogData));
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
    this.dialogService.openMatDialog(CourseEditDialogComponent, {
      ...mapCourseToDialogData(course),
      onSubmit: this.handleEditingSubmit.bind(this, course.id),
    });
  }

  public deleteCourse = (id: number) => {
    this.courseService.delete(id);
  }

  public showRemovingDialog(course: Course) {
    this.dialogService.showConfirmation({
      title: 'Do you really want to delete this course?',
      onSubmit: () => this.deleteCourse(course.id),
    });
  }
}
