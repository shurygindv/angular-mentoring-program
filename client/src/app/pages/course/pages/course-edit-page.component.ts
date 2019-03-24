import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {State} from '@ngrx/store';

import {Course} from '../../../core/models/course.interface';
import {RootStoreState} from 'src/app/root-store';
import {CourseStoreSelectors} from 'src/app/root-store/course-store';
import {
  UpdateCourseByIdAction,
  AddCourseAction,
} from '../../../root-store/course-store/actions';
import {Author} from 'src/app/core/models/author.interface';
import {Subscription} from 'rxjs';
import {StoreService} from 'src/app/core/services/store/store.service';

const createStrictFormControl = <T>(value: T, validators?: ValidatorFn[]) =>
  new FormControl(value, [Validators.required].concat(validators || []));

const createFormControl = <T>(value?: T) => new FormControl(value);

enum coursePageState {
  creating = 0,
  updating = 1,
}

const NEW_COURSE = 'new';

@Component({
  selector: 'app-course-edit-page-component',
  templateUrl: './course-edit-page.component.html',
  styleUrls: ['./course-edit-page.component.scss'],
})
export class CourseEditPageComponent implements OnInit, OnDestroy {
  private pageState: coursePageState;
  private route: ActivatedRoute;
  private router: Router;
  private state: State<RootStoreState.State>;
  private courseGroupForm: FormGroup;
  private storeService: StoreService;
  private selectedAuthorIds: string[];
  private authorsNotifierSubscription: Subscription;

  constructor(
    route: ActivatedRoute,
    router: Router,
    state: State<RootStoreState.State>,
    storeService: StoreService,
  ) {
    this.route = route;
    this.router = router;
    this.storeService = storeService;
    this.state = state;
    this.pageState = coursePageState.creating;
    this.courseGroupForm = this.initFormGroup();
  }

  public get formControls() {
    return this.courseGroupForm.controls;
  }

  public get courseId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  private updateCourseForm(id: number) {
    this.setPageState(coursePageState.updating);

    this.storeService
      .select(CourseStoreSelectors.selectCourseById(id))
      .subscribe(this.fillCourseForm)
      .unsubscribe();
  }

  private notifyWhenAuthorsChange() {
    this.authorsNotifierSubscription = this.formControls.authors.valueChanges.subscribe(
      (ids: string[]) => {
        this.setSelectedAuthorIds(ids);
      },
    );
  }

  public ngOnInit(): void {
    this.notifyWhenAuthorsChange();

    if (this.courseId === NEW_COURSE) {
      return;
    }

    this.updateCourseForm(+this.courseId);
  }

  public ngOnDestroy() {
    if (this.authorsNotifierSubscription) {
      this.authorsNotifierSubscription.unsubscribe();
    }
  }

  public hasChanges(): boolean {
    return this.courseGroupForm.touched;
  }

  private createCourse(course: Course): void {
    this.storeService.dispatch(new AddCourseAction({course}));
  }

  private updateCourse(course: Course): void {
    const id = +this.courseId;

    this.storeService.dispatch(new UpdateCourseByIdAction({id, course}));
  }

  private save(course: Course): void {
    if (this.pageState === coursePageState.creating) {
      this.createCourse(course);
    }

    if (this.pageState === coursePageState.updating) {
      this.updateCourse(course);
    }

    this.navigateToHome();
  }

  private setPageState(state: coursePageState): void {
    this.pageState = state;
  }

  private initFormGroup(): FormGroup {
    return new FormGroup({
      name: createStrictFormControl('', [Validators.maxLength(50)]),
      description: createStrictFormControl('', [Validators.maxLength(200)]),
      date: createStrictFormControl(''),
      length: createStrictFormControl(''),
      isTopRated: createFormControl(''),
      authors: createStrictFormControl([]),
    });
  }

  private mapIdsToAuthors(ids: string[]): Author[] {
    const authorDictionary: {[key: string]: Author} = this.state.getValue()
      .authors.entities;

    return (ids || []).map(
      (selectedId: string) => authorDictionary[selectedId],
    );
  }

  private getDoneCourse(): Course {
    return {
      name: this.formControls.name.value,
      isTopRated: this.formControls.isTopRated.value,
      date: this.formControls.date.value,
      length: this.formControls.length.value,
      description: this.formControls.description.value,
      authors: this.mapIdsToAuthors(this.selectedAuthorIds),
    };
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('/courses');
  }

  public fillCourseForm = (course: Course): void => {
    this.courseGroupForm.setValue({
      name: course.name,
      isTopRated: course.isTopRated,
      length: course.length,
      description: course.description,
      date: course.date,
      authors: this.mapAuthorToControlIds(course.authors || []),
    });
  }

  public onDone($event: Event): void {
    $event.preventDefault(); // TODO: implement pipe on preventDefault

    this.save(this.getDoneCourse());
  }

  public mapAuthorToControlIds(authors: Author[]): string[] {
    this.setSelectedAuthorIds(authors.map((author: Author) => author.id));

    return this.selectedAuthorIds;
  }

  public setSelectedAuthorIds(ids: string[]): void {
    this.selectedAuthorIds = [...ids];
  }
}
