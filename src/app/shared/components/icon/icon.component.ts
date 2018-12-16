import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() public size: string;
  @Input() public name: any;
  @Input() public className: string;

  public getClasses() {
    return {
      [`icon-${this.name}`]: this.name,
      [this.className]: this.className,
    };
  }
}
