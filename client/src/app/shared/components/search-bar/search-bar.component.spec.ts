import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {SearchBarComponent} from './search-bar.component';
import {ButtonComponent} from '../button/button.component';
import {TextComponent} from '../text/text.component';
import {IconComponent} from '../icon/icon.component';

import {importTranslateModule} from '../../../app.module';
import {CoreModule} from '../../../core/core.module';
describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CoreModule, importTranslateModule()],
      declarations: [
        SearchBarComponent,
        ButtonComponent,
        TextComponent,
        IconComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render self', () => {
    const elem = fixture.debugElement.nativeElement.querySelector(
      '.search-bar',
    );

    expect(elem).toBeTruthy();
  });

  it('should call submit callback', () => {
    spyOn(component, 'submitSearchValue');

    component.searchForm.setValue({search: 'changes'});

    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', {
      preventDefault: e => {
        e.preventDefault();
      },
    });

    fixture.whenStable().then(() => {
      expect(component.submitSearchValue).toHaveBeenCalled();
    });
  });

  it('should change value', () => {
    spyOn(component, 'submitSearchValue');

    component.searchForm.setValue({search: 'changes'});

    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('input');

    expect(input.value).toEqual('changes');
  });
});
