import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextComponent} from './text.component';

const hasClasses = (elem, ...classes: string[]) =>
  elem.classList.contains(...classes);

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render self', () => {
    expect(findElem('span')).toBeTruthy();
  });

  it('should work map `bold` to css className', () => {
    component.bold = true;
    fixture.detectChanges();

    expect(hasClasses(findElem('span'), 'text--bold')).toBeTruthy();
  });

  it('should work attr `left`', () => {
    component.left = true;
    fixture.detectChanges();

    expect(hasClasses(findElem('span'), 'text--left')).toBeTruthy();
  });

  it('should work attr `center`', () => {
    component.center = true;
    fixture.detectChanges();

    expect(hasClasses(findElem('span'), 'text--center')).toBeTruthy();
  });

  it('should work attr `right`', () => {
    component.right = true;
    fixture.detectChanges();

    expect(hasClasses(findElem('span'), 'text--right')).toBeTruthy();
  });

  it('should work attr `color`', () => {
    component.color = 'white';
    fixture.detectChanges();

    expect(hasClasses(findElem('span'), 'text--white')).toBeTruthy();
  });
});
