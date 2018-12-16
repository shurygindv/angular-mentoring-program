import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() public size: string; // not used yet
  @Input() public name: any;
  @Input() public className: string; // not used yet

  public getClasses() {
    return {
      [`icon-${this.name}`]: this.name,
      [this.className]: this.className,
    };
  }
}
