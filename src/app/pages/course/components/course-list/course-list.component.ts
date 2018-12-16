import {Component, Input} from '@angular/core';

import {Course} from '../../../../core/models/course.interface';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() public items: Course[];
}
