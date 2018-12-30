import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HostHeaderComponent} from './host-header.component.spec';
import {HeaderComponent} from './header.component';
import {ButtonComponent} from '../button/button.component';
import {TextComponent} from '../text/text.component';
import {IconComponent} from '../icon/icon.component';
import {MenuProfileComponent} from '../menu-profile/menu-profile.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostHeaderComponent,
        HeaderComponent,
        ButtonComponent,
        TextComponent,
        IconComponent,
        MenuProfileComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render <header> container', () => {
    expect(findElem('header')).toBeTruthy();
  });

  it('should render <profile> element', () => {
    expect(findElem('app-menu-profile')).toBeTruthy();
  });

  it('should feel right as child', () => {
    const testFixture: ComponentFixture<
      HostHeaderComponent
    > = TestBed.createComponent(HostHeaderComponent);
    testFixture.detectChanges();

    const hostContainsHeader: boolean = !!testFixture.debugElement.nativeElement.querySelector(
      'header',
    );

    expect(hostContainsHeader).toBeTruthy();
  });
});
