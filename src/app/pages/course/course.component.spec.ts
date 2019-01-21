import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseComponent} from './course.component';
import {SharedModule} from '../../shared/shared.module';
import {CourseListComponent} from './components/course-list/course-list.component';
import {OrderByCoursePipe} from './order-by-course.pipe';
import {MaterialUiModule} from '../../shared/material-ui.module';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, MaterialUiModule],
      declarations: [CourseComponent, CourseListComponent, OrderByCoursePipe],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have course list', () => {
    expect(findElem('app-course-list')).toBeTruthy();
  });

  it('should have container (body)', () => {
    expect(findElem('app-body')).toBeTruthy();
  });

  it('should fetch course list after ngOnInit', () => {
    spyOn(component, 'fetchCourses');

    component.ngOnInit();

    expect(component.fetchCourses).toHaveBeenCalled();
  });

  it('should render course list', () => {
    component.courses = [
      {
        id: 0,
        topRated: false,
        title: 'How to become better than you thought possible',
        creationDate: '2018-10-21T13:28:06.419Z',
        duration: 60,
        description: '',
      },
      {
        id: 0,
        topRated: false,
        title: 'How to become better than you thought possible',
        creationDate: '2018-10-21T13:28:06.419Z',
        duration: 60,
        description: '',
      },
    ];

    fixture.detectChanges();

    const courses = findElem('.course-list').children.length;

    expect(courses).toEqual(2);
  });
});
