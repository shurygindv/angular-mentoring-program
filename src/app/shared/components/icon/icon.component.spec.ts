import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IconComponent} from './icon.component';

const hasClasses = (elem, ...classes: string[]) =>
  elem.classList.contains(...classes);

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render own <i>', () => {
    expect(findElem('i')).toBeTruthy();
  });

  it('should work map name to className', () => {
    component.name = 'logo';
    fixture.detectChanges();

    expect(hasClasses(findElem('i'), 'icon-logo')).toBeTruthy();
  });
});
