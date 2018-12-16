import { CoreModule } from './../../core/core.module';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseComponent} from './course.component';
import {SharedModule} from '../../shared/shared.module';
import {CourseListComponent} from './components/course-list/course-list.component';
import { CourseService } from '../../core/services/course/course.service';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CourseComponent, CourseListComponent],
    //  providers: [CourseService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have course lis1t', () => {
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

    fixture.detectChanges();

    const courses = findElem('.course-list').children.length;

    expect(courses).toEqual(2);
  });
});
