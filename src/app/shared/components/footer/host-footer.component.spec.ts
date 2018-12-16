import {FooterComponent} from './footer.component';
import {ViewChild, Component} from '@angular/core';

@Component({
  selector: `app-host-footer`,
  template: `
    <app-footer></app-footer>
  `,
})
export class HostFooterComponent {
  @ViewChild(FooterComponent)
  public underTestComponent: FooterComponent;
}
