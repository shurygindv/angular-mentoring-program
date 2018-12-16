import {Component, Input} from '@angular/core';

type Colors = 'white';
type Sizes = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent {
  @Input() public padded: Sizes;
  @Input() public color: Colors;

  @Input() public uppercased: boolean;
  @Input() public bold: boolean;

  @Input() public left: boolean;
  @Input() public center: boolean;
  @Input() public right: boolean;

  public getClasses() {
    return {
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
