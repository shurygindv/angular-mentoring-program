import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppRoutingModule} from '../../../app-routing.module';
import {CoreModule} from '../../../core/core.module';
import {SharedModule} from '../../shared.module';
import {HeaderComponent} from './header.component';
import {HostHeaderComponent} from './host-header.component.spec';
import {RootStoreModule} from 'src/app/root-store/root-store.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule, AppRoutingModule, RootStoreModule],
      declarations: [HostHeaderComponent],
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

  it('should render <profile> element when auth flag', () => {
    const element = findElem('app-menu-profile');

    if (!component.isAuthenticated) {
      expect(element).toBeFalsy();
    }
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
