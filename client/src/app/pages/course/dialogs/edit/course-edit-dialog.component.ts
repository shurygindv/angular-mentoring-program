import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DurationNormalizerPipe} from 'src/app/shared/duration-normalizer.pipe';

import {Course} from '../../../../core/models/course.interface';
import {ConfirmationDialogData} from '../../../../core/services/dialog/dialog.interface';
import {Omit} from '../../../../utils/types';

export class CourseSharedData {
  constructor(
    name: string,
    description: string,
    length: number,
    date: string | Date,
    authors: string[],
    isTopRated: boolean,
  ) {
    this.name = name;
    this.description = description;
    this.length = length;
    this.date = date;
    this.authors = authors;
    this.isTopRated = isTopRated;
  }
  // temp data, static
  public name: string;
  public description: string;
  public length: number;
  public date: string | Date;
  public authors: string[];
  public isTopRated: boolean;

  public static map(
    data?: Omit<ICourseEditDialogData, 'onSubmit'>,
  ): CourseSharedData {
    if (!data) {
      return CourseSharedData.stub();
    }

    return new CourseSharedData(
      data.title,
      data.description,
      data.length,
      data.date,
      data.authors,
      data.isTopRated,
    );
  }

  public static toCourse(data: CourseSharedData): Course {
    return {
      name: data.name,
      isTopRated: data.isTopRated,
      length: data.length,
      description: data.description,
      date: data.date,
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
  name?: string;
  isTopRated?: boolean;
  length?: number;
  description?: string;
  date?: string | Date;
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
      name: createStrictFormControl(courseProps.name),
      date: createStrictFormControl(courseProps.date),
      duration: createStrictFormControl(courseProps.length),
      isTopRated: createFormControl(courseProps.isTopRated),
      description: createStrictFormControl(courseProps.description),
    });
  }

  private getDoneCourse(): Omit<ICourseEditDialogData, 'onSubmit'> {
    return {
      name: this.formControls.name.value,
      isTopRated: this.formControls.isTopRated.value,
      date: this.formControls.date.value,
      length: this.formControls.length.value,
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
