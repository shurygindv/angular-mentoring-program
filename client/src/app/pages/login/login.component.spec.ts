import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {SharedModule} from '../../shared/shared.module';
import {MaterialUiModule} from '../../shared/material-ui.module';
import {LoginComponent} from './login.component';
import {CoreModule} from '../../core/core.module';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RootStoreModule} from 'src/app/root-store/root-store.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,
        MaterialUiModule,
        RootStoreModule,
      ],
      declarations: [LoginComponent],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have submit button', () => {
    expect(findElem('button')).toBeTruthy();
  });
});
