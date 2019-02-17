import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoaderOverlayComponent} from './loader-overlay.component';
import {LoaderService} from '../../../core/services/loader/loader.service';

describe('LoaderOverlay', () => {
  let component: LoaderOverlayComponent;
  let fixture: ComponentFixture<LoaderOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderOverlayComponent],
      providers: [LoaderService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create components', () => {
    expect(component).toBeTruthy();
  });
});
