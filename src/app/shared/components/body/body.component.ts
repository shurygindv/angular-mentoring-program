import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent {}
