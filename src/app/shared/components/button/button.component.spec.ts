import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonComponent} from './button.component';
import {HostButtonComponent} from './host-button.component.spec';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent, HostButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have <ol> container', () => {
    expect(findElem('button')).toBeTruthy();
  });

  it('should handle clicks', () => {
    spyOn(component, 'onClick');

    findElem('button').click();

    fixture.whenStable().then(() => {
      expect(component.onClick).toHaveBeenCalled();
    });
  });
});
