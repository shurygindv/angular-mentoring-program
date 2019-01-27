import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material';

import {DialogService} from './dialog.service';
import {DialogConfirmationComponent} from '../../../shared/components/dialogs/confirm/dialog-confirmation.component';
import { MaterialUiModule } from '../../../shared/material-ui.module';
import { CourseEditDialogComponent } from '../../../pages/course/dialogs/edit/course-edit-dialog.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [DialogConfirmationComponent, CourseEditDialogComponent],
  imports: [CommonModule, MaterialUiModule, SharedModule, MatDialogModule],
  entryComponents: [
    DialogConfirmationComponent,

    CourseEditDialogComponent,
  ],
  providers: [DialogService],
  exports: [DialogConfirmationComponent],
})
export class DialogModule {}
