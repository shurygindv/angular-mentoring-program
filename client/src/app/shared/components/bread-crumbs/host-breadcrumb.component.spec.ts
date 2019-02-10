import {ViewChild, Component} from '@angular/core';

import {BreadCrumbsComponent} from './bread-crumbs.component';

@Component({
  selector: `app-host-breadcrumb`,
  template: `
    <app-bread-crumbs></app-bread-crumbs>
  `,
})
export class HostBreadcrumbComponent {
  @ViewChild(BreadCrumbsComponent)
  public underTestComponent: BreadCrumbsComponent;
}
