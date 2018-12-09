import {Component, Input, Output, EventEmitter} from '@angular/core';

type Sizes = 'xs' | 'sm' | 'md' | 'lg';
type ButtonTypes = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: ButtonTypes = 'button';
  @Input() className: string;
  @Input() view: string;
  @Input() size: Sizes;
  // flags
  @Input() uppercased: boolean;
  @Input() disabled: boolean;
  @Input() full: boolean;
  // handlers
  @Output() click = new EventEmitter<null>();

  handleClick() {
    console.log('click');
    this.click.emit(null);
  }

  getClasses() {
    return {
      'btn': true,

      'btn-full': this.full,
      'btn-uppercased': this.uppercased,

      [`btn-size--${this.size}`]: this.size,
      [`btn-${this.view}`]: this.view,
      [this.className]: this.className,
    };
  }

}
