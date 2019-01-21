import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  description: string;

  onConfirm(): void;
  onCancel(): void;
}

// TODO: dialog service with different modes

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent {
  private dialogRef: MatDialogRef<DialogConfirmationComponent>;

  constructor(
    dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogRef = dialogRef;
  }

  public onConfirm(): void {
    if (this.data.onConfirm) {
      this.data.onConfirm();
    }

    this.dialogRef.close();
  }

  public onCancel() {
    if (this.data.onCancel) {
      this.data.onCancel();
    }

    this.dialogRef.close();
  }
}
