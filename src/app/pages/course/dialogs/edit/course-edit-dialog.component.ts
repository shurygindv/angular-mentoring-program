import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DurationNormalizerPipe} from 'src/app/shared/duration-normalizer.pipe';

import {Course} from '../../../../core/models/course.interface';
import {ConfirmationDialogData} from '../../../../core/services/dialog/dialog.interface';
import {Omit} from '../../../../utils/types';

export class CourseSharedData {
  constructor(
    title: string,
    description: string,
    duration: number,
    creationDate: string | Date,
    authors: string[],
    topRated: boolean,
  ) {
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.creationDate = creationDate;
    this.authors = authors;
    this.topRated = topRated;
  }
  // temp data, static
  public title: string;
  public description: string;
  public duration: number;
  public creationDate: string | Date;
  public authors: string[];
  public topRated: boolean;

  public static map(
    data?: Omit<ICourseEditDialogData, 'onSubmit'>,
  ): CourseSharedData {
    if (!data) {
      return CourseSharedData.stub();
    }

    return new CourseSharedData(
      data.title,
      data.description,
      data.duration,
      data.creationDate,
      data.authors,
      data.topRated,
    );
  }

  public static toCourse(data: CourseSharedData): Course {
    return {
      title: data.title,
      topRated: data.topRated,
      duration: data.duration,
      description: data.description,
      creationDate: data.creationDate,
    };
  }

  public static stub() {
    return new CourseSharedData('', '', 0, Date.now().toString(), [], false);
  }
}

// params which dialog will accept from outer area (edit/create)
export interface ICourseEditDialogData
  extends ConfirmationDialogData<CourseSharedData> {
  authors?: [];
  title?: string;
  topRated?: boolean;
  duration?: number;
  description?: string;
  creationDate?: string | Date;
}

const createStrictFormControl = <T>(value: T) =>
  new FormControl(value, [Validators.required]);

const createFormControl = <T>(value: T) => new FormControl(value);

@Component({
  selector: 'app-course-edit-dialog',
  templateUrl: './course-edit-dialog.component.html',
  styleUrls: ['./course-edit-dialog.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseEditDialogComponent {
  private dialogRef: MatDialogRef<CourseEditDialogComponent>;
  private dialogData: ICourseEditDialogData;

  public courseGroupForm: FormGroup;

  constructor(
    dialogRef: MatDialogRef<CourseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: ICourseEditDialogData,
  ) {
    this.dialogRef = dialogRef;
    this.dialogData = data;

    this.courseGroupForm = this.initFormGroup(CourseSharedData.map(data));
  }

  public get data(): ICourseEditDialogData {
    return this.dialogData;
  }

  public get formControls() {
    return this.courseGroupForm.controls;
  }

  @Input()
  public get durationPlaceholder() {
    const value = this.formControls.duration.value;

    if (value) {
      return `Duration ~ ${DurationNormalizerPipe.init(value)}`;
    }

    return 'Duration';
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }

  private initFormGroup(courseProps: CourseSharedData): FormGroup {
    return new FormGroup({
      title: createStrictFormControl(courseProps.title),
      date: createStrictFormControl(courseProps.creationDate),
      duration: createStrictFormControl(courseProps.duration),
      topRated: createFormControl(courseProps.topRated),
      description: createStrictFormControl(courseProps.description),
    });
  }

  private getDoneCourse(): Omit<ICourseEditDialogData, 'onSubmit'> {
    return {
      title: this.formControls.title.value,
      topRated: this.formControls.topRated.value,
      creationDate: this.formControls.date.value,
      duration: this.formControls.duration.value,
      description: this.formControls.description.value,
    };
  }

  public getCommonErrorMsg(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  public onFormSubmit($event: Event): void {
    $event.preventDefault(); // TODO: implement pipe on preventDefault

    if (this.courseGroupForm.invalid) {
      console.log('Error: form is invalid');
      return;
    }

    if (this.courseGroupForm.untouched) {
      this.closeDialog();
      return;
    }

    this.dialogData.onSubmit(CourseSharedData.map(this.getDoneCourse()));

    this.closeDialog();
  }
}
