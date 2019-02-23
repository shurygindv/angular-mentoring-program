import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Course} from '../../../core/models/course.interface';
import {CourseService} from '../../../core/services/course/course.service';
import {DurationNormalizerPipe} from '../../../shared/duration-normalizer.pipe';

const createStrictFormControl = <T>(value?: T) =>
  new FormControl(value, [Validators.required]);

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
  private courseGroupForm: FormGroup;
  private courseService: CourseService;

  private ngUnsubscribe = new Subject();

  constructor(
    route: ActivatedRoute,
    router: Router,
    courseService: CourseService,
  ) {
    this.route = route;
    this.router = router;
    this.courseService = courseService;
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

    this.courseService
      .getCourseById(Number(id))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((course: Course) => {
        this.fillCourseForm(course);
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public hasChanges(): boolean {
    return this.courseGroupForm.touched;
  }

  private createCourse(course: Course): void {
    this.courseService
      .create(course)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.navigateToHome());
  }

  private updateCourse(course: Course): void {
    const id = +this.courseId;

    this.courseService
      .update(id, course)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.navigateToHome());
  }

  private save(course: Course): void {
    if (!this.hasChanges()) {
      return;
    }

    if (this.pageState === coursePageState.creating) {
      this.createCourse(course);
      return;
    }

    if (this.pageState === coursePageState.updating) {
      this.updateCourse(course);
      return;
    }
  }

  private setPageState(state: coursePageState): void {
    this.pageState = state;
  }

  private initFormGroup(): FormGroup {
    return new FormGroup({
      name: createStrictFormControl(),
      date: createStrictFormControl(),
      length: createStrictFormControl(),
      isTopRated: createFormControl(),
      description: createStrictFormControl(),
    });
  }

  private getDoneCourse(): Course {
    return {
      name: this.formControls.name.value,
      isTopRated: this.formControls.isTopRated.value,
      date: this.formControls.date.value,
      length: this.formControls.length.value,
      description: this.formControls.description.value,
    };
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('/courses');
  }

  public fillCourseForm(course: Course): void {
    this.courseGroupForm.setValue({
      name: course.name,
      isTopRated: course.isTopRated,
      length: course.length,
      description: course.description,
      date: course.date,
    });
  }

  public onDone($event: Event): void {
    $event.preventDefault(); // TODO: implement pipe on preventDefault

    this.save(this.getDoneCourse());
  }
}
