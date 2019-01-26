import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {}

// TODO: dialog service with different modes

@Component({
  selector: 'app-dialog-add-course',
  templateUrl: './dialog-add-course.component.html',
  styleUrls: ['./dialog-add-coursen.component.scss'],
})
export class DialogAddCourseComponent {
  private dialogRef: MatDialogRef<DialogAddCourseComponent>;
  private dialogData: DialogData;

  constructor(
    dialogRef: MatDialogRef<DialogAddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
  ) {
    this.dialogRef = dialogRef;
    this.dialogData = data;
  }
}
