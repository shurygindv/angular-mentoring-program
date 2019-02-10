import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

type BorderType = 'silver';
type Sizes = 'xs' | 'sm' | 'md' | 'lg';
type AlignType = 'vertical' | 'horizontal' | 'both';

const name = 'content-box';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBoxComponent {
  @Input() public borderType: BorderType;
  @Input() public size: Sizes = 'xs';
  @Input() public align: AlignType;

  public getClasses() {
    return {
      [`${name}-size--${this.size}`]: this.size,
      [`${name}-border--silver`]: this.borderType,

      [`${name}-align--${this.align}`]: this.align,
    };
  }
}
