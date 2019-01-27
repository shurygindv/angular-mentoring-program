import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObserversModule} from '@angular/cdk/observers';
// material ui
import {
  MatInputModule,
  MatButton,
  MatRippleModule,
} from '@angular/material';


@NgModule({
  declarations: [MatButton],
  imports: [
    CommonModule,
    MatRippleModule,
    ObserversModule,
    MatInputModule,
  ],
  exports: [
    MatInputModule,
    MatRippleModule,
    MatButton,
  ],
})
export class MaterialUiModule {}
