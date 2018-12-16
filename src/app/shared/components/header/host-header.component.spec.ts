import {ViewChild, Component} from '@angular/core';

import {HeaderComponent} from './header.component';

@Component({
  selector: `app-host-header`,
  template: `
    <app-header></app-header>
  `,
})
export class HostHeaderComponent {
  @ViewChild(HeaderComponent)
  public underTestComponent: HeaderComponent;
}
