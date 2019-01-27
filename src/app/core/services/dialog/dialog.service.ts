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

  public openMatDialog<D extends DialogData>(dialog: any, data: D): void {
    this.matDialog.open(dialog, {
      data,
    });
  }

  public showConfirmation<T extends ConfirmationDialogData>(data: T): void {
    this.openMatDialog(DialogConfirmationComponent, data);
  }
}
