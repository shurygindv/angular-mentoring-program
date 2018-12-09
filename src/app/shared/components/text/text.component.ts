import {Component, Input} from '@angular/core';

type Colors = 'white';
type Sizes = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent {
  @Input() padded: Sizes;
  @Input() color: Colors;

  @Input() uppercased: boolean;
  @Input() bold: boolean;

  @Input() left: boolean;
  @Input() center: boolean;
  @Input() right: boolean;

  getClasses() {
    return {
      'text': true,

      [`text-padded--${this.padded}`]: this.padded,
      [`text--${this.color}`]: this.color,

      'text--bold': this.bold,
      'text--left': this.left,
      'text--right': this.right,
      'text--center': this.center,
      'text--uppercased': this.uppercased,
    };
  }
}
