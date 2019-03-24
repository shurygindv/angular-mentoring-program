import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import {
  TranslateService,
  KEYS,
} from 'src/app/core/services/translate/translate-service';
import {SwitcherItem} from '../switcher/switcher.component';

const mapKeyToName = (key: string): string => {
  return {
    [KEYS.RUSSIA]: 'Russia',
    [KEYS.ENGLISH]: 'English',
  }[key];
};

const mapLangToSwitcher = (langKeys: string[]): SwitcherItem[] =>
  (langKeys || []).map((key: string) => ({
    key: key,
    name: mapKeyToName(key),
  }));

@Component({
  selector: 'app-lang-switcher-container',
  template: `
    <app-switcher
      [items]="langItems"
      (change)="onChange($event)"
    ></app-switcher>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitcherComponent {
  @Input() public langItems: SwitcherItem[];

  @Output() public change = new EventEmitter<SwitcherItem>();

  public translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this.translateService = translateService;
    this.langItems = mapLangToSwitcher(translateService.getIntlKeys());
  }

  private emitChanges(item: SwitcherItem): void {
    this.change.emit(item);
  }

  private apply(key: string): void {
    this.translateService.setDefaultLang(key);
  }

  public onChange(item: SwitcherItem): void {
    this.apply(item.key);
    this.emitChanges(item);
  }
}
