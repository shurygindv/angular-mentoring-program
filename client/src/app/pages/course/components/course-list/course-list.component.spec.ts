import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from '../../../../app-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {CourseListComponent} from './course-list.component';
import {HostCourseListComponent} from './host-course-list.component.spec';

const testMockedCourses = [
  {
    id: 0,
    isTopRated: false,
    name: 'How to become better than you thought possible',
    date: '2018-10-21T13:28:06.419Z',
    length: 60,
    description: '',
    authors: [],
  },
  {
    id: 0,
    isTopRated: false,
    name: 'How to become better than you thought possible',
    date: '2018-10-21T13:28:06.419Z',
    length: 60,
    description: '',
    authors: [],
  },
];

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, SharedModule, AppRoutingModule],
      declarations: [CourseListComponent, HostCourseListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component component', () => {
    expect(component).toBeTruthy();
  });

  it('should have container', () => {
    expect(findElem('.card-container')).toBeTruthy();
  });

  it('should be immutable and work with push strategy', () => {
    component.items = testMockedCourses;

    fixture.detectChanges();

    const courses = findElem('ul').children.length;

    expect(courses).toEqual(0);
  });

  it('should feel right as child of something container', () => {
    const testFixture: ComponentFixture<
      HostCourseListComponent
    > = TestBed.createComponent(HostCourseListComponent);

    const testComponent = testFixture.componentInstance;
    const compiled = testFixture.debugElement.nativeElement;

    testComponent.underTestComponent.items = testMockedCourses;

    testFixture.detectChanges();

    expect(compiled.querySelector('ul').children.length).toBe(2);
  });
});
