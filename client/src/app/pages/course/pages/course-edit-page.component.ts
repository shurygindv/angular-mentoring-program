import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

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

@Component({
  selector: 'app-course-edit-page-component',
  templateUrl: './course-edit-page.component.html',
  styleUrls: ['./course-edit-page.component.scss'],
})
export class CourseEditPageComponent implements OnInit {
  private pageState: coursePageState;
  private route: ActivatedRoute;
  private router: Router;
  private courseGroupForm: FormGroup;
  private courseService: CourseService;

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
    const value = this.formControls.duration.value;

    if (value) {
      return `Duration ~ ${DurationNormalizerPipe.init(value)}`;
    }

    return 'Duration';
  }

  public get courseId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  public ngOnInit(): void {
    const id = this.courseId;

    if (id === '') {
      return;
    }

    this.setPageState(coursePageState.updating);

    this.courseService
      .getCourseById(Number(id))
      .pipe(first())
      .subscribe((course: Course) => {
        this.fillCourseForm(course);
      });
  }

  public hasChanges(): boolean {
    return this.courseGroupForm.touched;
  }

  private save(course: Course): void {
    if (!this.hasChanges()) {
      return;
    }

    switch (this.pageState) {
      case coursePageState.creating: {
        this.courseService
          .create(course)
          .pipe(first())
          .subscribe(() => this.courseService.fetchCourses());
        break;
      }
      case coursePageState.updating: {
        this.courseService
          .update(+this.courseId, course)
          .pipe(first())
          .subscribe(() => this.courseService.fetchCourses());
        break;
      }
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
      length: this.formControls.duration.value,
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
    this.navigateToHome();
  }
}
