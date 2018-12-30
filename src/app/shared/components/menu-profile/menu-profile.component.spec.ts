import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IconComponent} from './../icon/icon.component';
import {MenuProfileComponent} from './menu-profile.component';
import {ButtonComponent} from '../button/button.component';

describe('MenuProfileComponent', () => {
  let component: MenuProfileComponent;
  let fixture: ComponentFixture<MenuProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuProfileComponent, IconComponent, ButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render self', () => {
    const elem: Element = fixture.debugElement.nativeElement.querySelector(
      '.menu-profile',
    );

    expect(elem).toBeTruthy();
  });
});
