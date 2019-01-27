import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonComponent} from './button.component';
import {HostButtonComponent} from './host-button.component.spec';

const hasClasses = (elem, ...classes: string[]) =>
  elem.classList.contains(...classes);

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

  it('should work map `view` to className', () => {
    component.view = 'default';
    fixture.detectChanges();

    // TODO: btn--default a.k.a bem
    expect(hasClasses(findElem('button'), 'btn--default')).toBeTruthy();
  });

  it('should work map `size` to className', () => {
    component.size = 'md';
    fixture.detectChanges();

    expect(hasClasses(findElem('button'), 'btn-size--md')).toBeTruthy();
  });

  it('should work attr `full width`', () => {
    component.full = true;
    fixture.detectChanges();

    // TODO: btn--default a.k.a bem
    expect(hasClasses(findElem('button'), 'btn--full')).toBeTruthy();
  });

  it('should work map `view as circle` to className', () => {
    component.view = 'circle';
    fixture.detectChanges();

    // TODO: btn--default a.k.a bem
    expect(hasClasses(findElem('button'), 'btn--circle')).toBeTruthy();
  });

  it('should work attr `uppercased`', () => {
    component.uppercased = true;
    fixture.detectChanges();

    expect(hasClasses(findElem('button'), 'btn--uppercased')).toBeTruthy();
  });

  it('should feel good as child', () => {
    const testFixture: ComponentFixture<
      HostButtonComponent
    > = TestBed.createComponent(HostButtonComponent);
    const testComponent = testFixture.componentInstance;

    testComponent.underTestComponent.type = 'submit';

    testFixture.detectChanges();

    const elem = testFixture.debugElement.nativeElement.querySelector('button');
    const type = elem.getAttribute('type');

    expect(type).toEqual('submit');
  });

  it('should handle clicks', () => {
    spyOn(component, 'onClick');

    findElem('button').click();

    fixture.whenStable().then(() => {
      expect(component.onClick).toHaveBeenCalled();
    });
  });
});
