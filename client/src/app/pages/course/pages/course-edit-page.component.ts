import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store, State} from '@ngrx/store';

import {Course} from '../../../core/models/course.interface';
import {DurationNormalizerPipe} from '../../../shared/duration-normalizer.pipe';
import {RootStoreState} from 'src/app/root-store';
import {CourseStoreSelectors} from 'src/app/root-store/course-store';
import {
  UpdateCourseByIdAction,
  AddCourseAction,
} from '../../../root-store/course-store/actions';
import { Author } from 'src/app/core/models/author.interface';

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
export class CourseEditPageComponent implements OnInit {
  private pageState: coursePageState;
  private route: ActivatedRoute;
  private router: Router;
  private state: State<RootStoreState.State>;
  private courseGroupForm: FormGroup;
  private store$: Store<RootStoreState.State>;
  private selectedAuthorIds: string[];

  constructor(
    route: ActivatedRoute,
    router: Router,
    state: State<RootStoreState.State>,
    store$: Store<RootStoreState.State>,
  ) {
    this.route = route;
    this.router = router;
    this.store$ = store$;
    this.state = state;
    this.pageState = coursePageState.creating;
    this.courseGroupForm = this.initFormGroup();
  }

  public get formControls() {
    return this.courseGroupForm.controls;
  }

  @Input()
  public get durationPlaceholder(): string {
    const value = this.formControls.length.value;

    if (value) {
      return `Duration ~ ${DurationNormalizerPipe.init(value)}`;
    }

    return 'Duration';
  }

  public get courseId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  public ngOnInit(): void {
    const id: string = this.courseId;

    if (id === NEW_COURSE) {
      return;
    }

    this.setPageState(coursePageState.updating);

    this.store$
      .select(CourseStoreSelectors.selectCourseById(+id))
      .subscribe(this.fillCourseForm)
      .unsubscribe();
  }

  public hasChanges(): boolean {
    return this.courseGroupForm.touched;
  }

  private createCourse(course: Course): void {
    this.store$.dispatch(new AddCourseAction({course}));
  }

  private updateCourse(course: Course): void {
    const id = +this.courseId;

    this.store$.dispatch(new UpdateCourseByIdAction({id, course}));
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
      description: createStrictFormControl('', [Validators.maxLength(50)]),
      date: createStrictFormControl(''),
      length: createStrictFormControl(''),
      isTopRated: createFormControl(''),
    });
  }

  private mapIdsToAuthors(ids: string[]): Author[] {
    const authorDictionary: {[key: string]: Author} = this.state.getValue().authors.entities;

    return (ids || []).map((selectedId: string) => authorDictionary[selectedId]);
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

  private setPlainCourseValues (course: Course): void {
    this.courseGroupForm.setValue({
      name: course.name,
      isTopRated: course.isTopRated,
      length: course.length,
      description: course.description,
      date: course.date,
    });
  }

  public fillCourseForm = (course: Course): void => {
    this.mapAuthorToControlIds(course.authors || []);
    this.setPlainCourseValues(course);
  }


  public onDone($event: Event): void {

    $event.preventDefault(); // TODO: implement pipe on preventDefault

    this.save(this.getDoneCourse());
  }

  public mapAuthorToControlIds (authors: Author[]): void {
    this.setSelectedAuthorIds(authors.map((author: Author) => author.id));
  }

  public setSelectedAuthorIds (ids: string[]): void {
    this.selectedAuthorIds = [...ids];
  }
}
