import {async, ComponentFixture, TestBed} from '@angular/core/testing';


import { SwitcherComponent } from './switcher.component';

describe('SwitcherComponent', () => {
  let component: SwitcherComponent;
  let fixture: ComponentFixture<SwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwitcherComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render self', () => {
    const elem: Element = fixture.debugElement.nativeElement.querySelector(
      '.switcher',
    );

    expect(elem).toBeTruthy();
  });
});
