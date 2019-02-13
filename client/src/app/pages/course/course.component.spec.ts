import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from '../../app-routing.module';
import {MaterialUiModule} from '../../shared/material-ui.module';
import {SharedModule} from '../../shared/shared.module';
import {CourseListComponent} from './components/course-list/course-list.component';
import {CourseComponent} from './course.component';
import {CourseEditPageComponent} from './pages/course-edit-page.component';
import { ApiService } from '../../core/services/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, SharedModule, MaterialUiModule, HttpClientModule, AppRoutingModule],
      providers: [ApiService],
      declarations: [
        CourseEditPageComponent,
        CourseComponent,
        CourseListComponent,
      ],
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
        isTopRated: false,
        name: 'How to become better than you thought possible',
        date: '2018-10-21T13:28:06.419Z',
        length: 60,
        description: '',
      },
      {
        id: 0,
        isTopRated: false,
        name: 'How to become better than you thought possible',
        date: '2018-10-21T13:28:06.419Z',
        length: 60,
        description: '',
      },
    ];

    fixture.detectChanges();

    const courses = findElem('.course-list').children.length;

    expect(courses).toEqual(2);
  });
});
