import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObserversModule} from '@angular/cdk/observers';
// material ui
import {
  MatInputModule,
  MatButton,
  MatRippleModule,
  MatNativeDateModule,
  MatButtonModule,
} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRippleModule,
    ObserversModule,
    MatInputModule,
  ],
  exports: [
    MatNativeDateModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule
  ],
})
export class MaterialUiModule {}
