import { Component, OnInit, Input } from '@angular/core';

import { ICourse } from '@app/core/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  @Input() public items: ICourse[];

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void {}

}
