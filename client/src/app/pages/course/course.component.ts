import {Component, Output, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {Course} from '../../core/models/course.interface';
import {DialogService} from '../../core/services/dialog/dialog.service';
import {
  ICourseEditDialogData,
  CourseSharedData,
} from './dialogs/edit/course-edit-dialog.component';
import {Omit} from '../../utils/types';
import {CourseEditDialogComponent} from './dialogs/edit/course-edit-dialog.component';
import {LoaderService} from '../../core/services/loader/loader.service';
import {RootStoreState} from 'src/app/root-store';
import {CourseStoreSelectors} from 'src/app/root-store/course-store';
import {UpdateCourseByIdAction} from '../../root-store/course-store/actions';
import {
  FilterCoursesAction,
  DeleteCourseByIdAction,
  FetchCoursesAction,
} from '../../root-store/course-store/actions';

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

  private store$: Store<RootStoreState.State>;
  private loaderService: LoaderService;
  private dialogService: DialogService;
  private coursesSubscription: Subscription;

  private pagination = {
    from: 0,
    take: 10,
  };

  constructor(
    store$: Store<RootStoreState.State>,
    dialogService: DialogService,
    loaderService: LoaderService,
  ) {
    this.store$ = store$;
    this.dialogService = dialogService;
    this.loaderService = loaderService;
  }

  public fetchCourses = (): void => {
    this.store$.dispatch(new FetchCoursesAction(this.pagination));
  }

  private updateCourseById(id: number, course: Course): void {
    this.store$.dispatch(new UpdateCourseByIdAction({id, course}));
  }

  private handleEditingSubmit(id: number, dialogData: CourseSharedData): void {
    this.updateCourseById(id, CourseSharedData.toCourse(dialogData));
  }

  private subscribeOnCourses(): void {
    this.coursesSubscription = this.store$
      .select(CourseStoreSelectors.selectAllCourses)
      .subscribe((courses: Course[]) => {
        console.log(courses);
        this.courses = courses;
      });
  }

  public ngOnInit(): void {
    this.subscribeOnCourses();
    this.fetchCourses();
  }

  public ngOnDestroy(): void {
    if (this.coursesSubscription) {
      this.coursesSubscription.unsubscribe();
    }
  }

  public updateSearch(filterBy: string): void {
    this.store$.dispatch(new FilterCoursesAction({filterBy}));
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
    this.store$.dispatch(new DeleteCourseByIdAction({id}));
  }

  public showRemovingDialog(course: Course): void {
    this.dialogService.showConfirmation({
      title: 'Do you really want to delete this course?',
      onSubmit: () => this.deleteCourse(course.id),
    });
  }
}
