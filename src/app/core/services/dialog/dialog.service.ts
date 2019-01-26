import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {DialogData, ConfirmationDialogData} from './dialog.interface';
import {DialogConfirmationComponent} from '../../../shared/components/dialogs/confirm/dialog-confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private matDialog: MatDialog;

  constructor(materialUiDialog: MatDialog) {
    this.matDialog = materialUiDialog;
  }

  public openMatDialog(dialog: any, data: DialogData): void {
    this.matDialog.open(dialog, {
      data,
    });
  }

  public showConfirmation(options: ConfirmationDialogData): void {
    this.openMatDialog(DialogConfirmationComponent, options);
  }
}
