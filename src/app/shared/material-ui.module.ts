import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObserversModule} from '@angular/cdk/observers';
// material ui
import {
  MatInputModule,
  MatButton,
  MatDialogModule,
  MatRippleModule,
} from '@angular/material';

import {DialogConfirmationComponent} from './components/dialog-confirmation/dialog-confirmation.component';

@NgModule({
  declarations: [MatButton, DialogConfirmationComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatDialogModule,
    ObserversModule,
    MatInputModule,
  ],
  entryComponents: [DialogConfirmationComponent],
  exports: [
    MatInputModule,
    MatRippleModule,
    MatButton,
    DialogConfirmationComponent,
  ],
})
export class MaterialUiModule {}
