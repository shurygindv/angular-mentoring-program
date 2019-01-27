import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {ConfirmationDialogData} from '../../../../core/services/dialog/dialog.interface';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent {
  private dialogRef: MatDialogRef<DialogConfirmationComponent>;
  private dialogData: ConfirmationDialogData;

  constructor(
    dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) data: ConfirmationDialogData,
  ) {
    this.dialogRef = dialogRef;
    this.dialogData = data;
  }

  get data (): ConfirmationDialogData {
    return this.dialogData;
  }

  public onConfirm(): void {
    if (this.dialogData.onSubmit) {
      this.dialogData.onSubmit();
    }

    this.dialogRef.close();
  }

  public onCancel() {
    if (this.dialogData.onCancel) {
      this.dialogData.onCancel();
    }

    this.dialogRef.close();
  }
}
