import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],


  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadCrumbsComponent {
  @Input() public items: string[];
}
