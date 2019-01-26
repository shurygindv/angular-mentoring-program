import {Component, Input, Output, EventEmitter} from '@angular/core';

type Sizes = 'xs' | 'sm' | 'md' | 'lg';
type ButtonTypes = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public type: ButtonTypes = 'button';
  @Input() public className: string;
  @Input() public view: string;
  @Input() public size: Sizes;
  // flags
  @Input() public uppercased: boolean;
  @Input() public disabled: boolean; // not used yet
  @Input() public full: boolean;
  // handlers
  @Output() public click = new EventEmitter<null>(); // TODO: type if need

  public getClasses() {
    return {
      'btn--full': this.full,
      'btn--uppercased': this.uppercased,

      [`btn-size--${this.size}`]: this.size,
      [`btn-${this.view}`]: this.view,
      [this.className]: this.className,
    };
  }
}
