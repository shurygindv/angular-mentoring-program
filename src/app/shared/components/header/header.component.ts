import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth/auth.service';
import {DialogService} from '../../../core/services/dialog/dialog.service';
import {CourseService} from '../../../core/services/course/course.service';
import {
  CourseEditDialogComponent,
  ICourseEditDialogData,
  CourseSharedData,
} from '../../../pages/course/dialogs/edit/course-edit-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService: AuthService;
  private courseService: CourseService;
  private dialogService: DialogService;

  constructor(
    authService: AuthService,
    dialogService: DialogService,
    courseService: CourseService,
  ) {
    this.authService = authService;
    this.courseService = courseService;
    this.dialogService = dialogService;
  }

  public isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  public showAddingDialog() {
    return this.dialogService.openMatDialog<ICourseEditDialogData>(
      CourseEditDialogComponent,
      {
        onSubmit: (dialogData: CourseSharedData) => {
          this.courseService.create(CourseSharedData.toCourse(dialogData));
        },
      },
    );
  }

  public logout() {
    this.authService.logout();
  }
}
