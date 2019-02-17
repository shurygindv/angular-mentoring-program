import {Component, Output, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

import {Course} from '../../core/models/course.interface';
import {CourseService} from './../../core/services/course/course.service';
import {DialogService} from '../../core/services/dialog/dialog.service';
import {
  ICourseEditDialogData,
  CourseSharedData,
} from './dialogs/edit/course-edit-dialog.component';
import {Omit} from '../../utils/types';
import {CourseEditDialogComponent} from './dialogs/edit/course-edit-dialog.component';
import {LoaderService} from '../../core/services/loader/loader.service';

const mapCourseToDialogData = (
  course: Course,
): Omit<ICourseEditDialogData, 'onSubmit'> => ({
  name: course.name,
  isTopRated: course.isTopRated,
  length: course.length,
  description: course.description,
  date: course.date,
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

  private ngUnsubscribe = new Subject();

  private loaderService: LoaderService;
  private courseService: CourseService;
  private dialogService: DialogService;

  private pagination = {
    from: 0,
    take: 10,
  };

  constructor(
    courseService: CourseService,
    dialogService: DialogService,
    loaderService: LoaderService,
  ) {
    this.courseService = courseService;
    this.dialogService = dialogService;
    this.loaderService = loaderService;
  }

  private updateCourses = (courses: Course[]) => {
    this.courses = courses;
  }

  public fetchCourses = () => {
    this.courseService
      .fetchCourses(this.pagination)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.updateCourses);
  }

  private updateCourseById(id: number, course: Course) {
    this.courseService
      .update(id, course)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.fetchCourses);
  }

  private handleEditingSubmit(id: number, dialogData: CourseSharedData) {
    this.updateCourseById(id, CourseSharedData.toCourse(dialogData));
  }

  public ngOnInit(): void {
    this.fetchCourses();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public updateSearch(value: string): void {
    this.courseService
      .filterBy(value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.updateCourses);
  }

  public showEditingDialog(course: Course): void {
    this.dialogService.openMatDialog(CourseEditDialogComponent, {
      ...mapCourseToDialogData(course),
      onSubmit: this.handleEditingSubmit.bind(this, course.id),
    });
  }

  public setPagination(from: number, take: number = 10): void {
    this.pagination = {from, take};
  }

  public addMoreCourses(): void {
    this.setPagination(this.pagination.from + 10);

    this.fetchCourses();
  }

  public deleteCourse = (id: number): void => {
    this.courseService
      .delete(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.fetchCourses);
  }

  public showRemovingDialog(course: Course): void {
    this.dialogService.showConfirmation({
      title: 'Do you really want to delete this course?',
      onSubmit: () => this.deleteCourse(course.id),
    });
  }
}
