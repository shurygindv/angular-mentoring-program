import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';

export interface SwitcherItem {
  key: string;
  name: string;
}

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitcherComponent implements OnChanges {
  @Input() public items: SwitcherItem[];

  @Output() public change = new EventEmitter<SwitcherItem>();

  public activeKey: string;

  constructor() {
    this.activeKey = '';
  }

  public ngOnChanges (): void {
    this.changeActiveKey(this.getFirstKey());
  }

  private getFirstKey (): string {
    const [first] = this.items;

    return first.key;
  }

  private changeActiveKey(value: string): void {
    this.activeKey = value;
  }

  private emitChanges(item: SwitcherItem): void {
    this.change.emit(item);
  }

  public onClick(item: SwitcherItem): void {
    this.changeActiveKey(item.key);
    this.emitChanges(item);
  }
}
