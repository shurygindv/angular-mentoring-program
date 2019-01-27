import {Component, Inject} from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../../../core/services/dialog/dialog.interface';

export interface CourseEditDialogData extends ConfirmationDialogData {

}

// TODO: dialog service with different modes

@Component({
  selector: 'app-course-edit-dialog',
  templateUrl: './course-edit-dialog.component.html',
  styleUrls: ['./course-edit-dialog.component.scss'],
})
export class CourseEditDialogComponent {
  private dialogRef: MatDialogRef<CourseEditDialogComponent>;
  private dialogData: CourseEditDialogData;

  public courseGroupForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    dialogRef: MatDialogRef<CourseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: CourseEditDialogData,
  ) {
    this.dialogRef = dialogRef;
    this.dialogData = data;
  }

  get formControls () {
    return this.courseGroupForm.controls;
  }

  public getCommonErrorMsg(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  public onFormSubmit($event: Event) {
    if (this.courseGroupForm.invalid) {
      console.log('Error: form is invalid');
      return;
    }



  }

  public onCancel ($event: Event) {

  }
}
