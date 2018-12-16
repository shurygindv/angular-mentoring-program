import {ViewChild, Component} from '@angular/core';

import {ButtonComponent} from './button.component';

@Component({
  selector: `app-host-button`,
  template: `
    <app-button></app-button>
  `,
})
export class HostButtonComponent {
  @ViewChild(ButtonComponent)
  public underTestComponent: ButtonComponent;
}
