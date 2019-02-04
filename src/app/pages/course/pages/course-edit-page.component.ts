import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Course} from '../../../core/models/course.interface';
import {CourseService} from '../../../core/services/course/course.service';
import {DurationNormalizerPipe} from '../../../shared/duration-normalizer.pipe';

const createStrictFormControl = <T>(value: T) =>
  new FormControl(value, [Validators.required]);

const createFormControl = <T>(value: T) => new FormControl(value);

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

    this.fillFormByCourseId(Number(id));

    if (id !== '') {
      this.setPageState(coursePageState.updating);
    }
  }

  public hasChanges(): boolean {
    return this.courseGroupForm.touched;
  }

  private save(course: Course): void {
    if (!this.hasChanges()) {
      this.navigateToHome();
      return;
    }

    switch (this.pageState) {
      case coursePageState.creating: {
        this.courseService.create(course);
        break;
      }
      case coursePageState.updating: {
        this.courseService.update(+this.courseId, course);
        break;
      }
    }
  }

  private setPageState(state: coursePageState): void {
    this.pageState = state;
  }

  private initFormGroup(course: Course): FormGroup {
    return new FormGroup({
      title: createStrictFormControl(course.title),
      date: createStrictFormControl(course.creationDate),
      duration: createStrictFormControl(course.duration),
      topRated: createFormControl(course.topRated),
      description: createStrictFormControl(course.description),
    });
  }

  private getDoneCourse(): Course {
    return {
      title: this.formControls.title.value,
      topRated: this.formControls.topRated.value,
      creationDate: this.formControls.date.value,
      duration: this.formControls.duration.value,
      description: this.formControls.description.value,
    };
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('/courses');
  }

  public fillFormByCourseId(id: number): void {
    const course = this.courseService.getById(id);

    this.courseGroupForm = this.initFormGroup(course);
  }

  public onDone($event: Event): void {
    $event.preventDefault(); // TODO: implement pipe on preventDefault

    this.save(this.getDoneCourse());
    this.navigateToHome();
  }
}
