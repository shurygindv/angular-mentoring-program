import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() size: string;
  @Input() name: any;
  @Input() className: string;

  getClasses() {
    return {
      icon: true,

      [`icon-${this.name}`]: this.name,
      [this.className]: this.className,
    };
  }
}
