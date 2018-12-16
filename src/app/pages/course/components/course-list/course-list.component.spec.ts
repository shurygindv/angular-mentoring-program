import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HostCourseListComponent} from './host-course-list.component.spec';
import {CourseListComponent} from './course-list.component';
import {SharedModule} from '../../../../shared/shared.module';

const testMockedCourses = [
  {
    id: 0,
    title: 'How to become better than you thought possible',
    creationDate: '2018-10-21T13:28:06.419Z',
    duration: 60,
    description: '',
  },
  {
    id: 0,
    title: 'How to become better than you thought possible',
    creationDate: '2018-10-21T13:28:06.419Z',
    duration: 60,
    description: '',
  },
];

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CourseListComponent, HostCourseListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have container', () => {
    expect(findElem('.card-container')).toBeTruthy();
  });

  it('should render course list', () => {
    component.items = testMockedCourses;

    fixture.detectChanges();

    const courses = findElem('ul').children.length;

    expect(courses).toEqual(2);
  });

  it('should render course list', () => {
    component.items = testMockedCourses;

    fixture.detectChanges();

    const courses = findElem('ul').children.length;

    expect(courses).toEqual(2);
  });

  it('should feel right as child of something container', () => {
    const testFixture = TestBed.createComponent(HostCourseListComponent);

    const testComponent = testFixture.componentInstance;
    const compiled = testFixture.debugElement.nativeElement;

    testComponent.underTestComponent.items = testMockedCourses;

    testFixture.detectChanges();

    expect(compiled.querySelector('ul').children.length).toBe(2);
  });
});