import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import * as courseActions from './actions';

import {CourseService} from '../../core/services/course/course.service';
import {Course} from 'src/app/core/models/course.interface';

@Injectable()
export class CourseStoreEffects {
  private courseService: CourseService;
  private actions$: Actions;

  constructor(courseService: CourseService, actions$: Actions) {
    this.courseService = courseService;
    this.actions$ = actions$;
  }

  @Effect()
  public fetchCoursesEffect$: Observable<Action> = this.actions$.pipe(
    ofType<courseActions.FetchCoursesAction>(
      courseActions.ActionTypes.START_FETCHING_COURSES,
    ),
    startWith(new courseActions.FetchCoursesAction()),
    switchMap(_ =>
      this.courseService.fetchCourses().pipe(
        map(
          (items: Course[]) =>
            new courseActions.FetchCoursesSuccessAction({
              items,
            }),
        ),
        catchError(error =>
          of(new courseActions.FetchCoursesErrorAction({error})),
        ),
      ),
    ),
  );

  @Effect()
  public updateCourseByIdEffect$: Observable<Action> = this.actions$.pipe(
    ofType<courseActions.UpdateCourseByIdAction>(
      courseActions.ActionTypes.START_UPDATING_COURSE,
    ),
    startWith(new courseActions.UpdateCourseByIdAction()),
    switchMap(_ =>
      this.courseService.fetchCourses().pipe(
        map(
          (items: Course[]) =>
            new courseActions.UpdateCourseSuccessAction(),
        ),
        catchError(error =>
          of(new courseActions.UpdateCourseErrorAction({error})),
        ),
      ),
    ),
  );

  @Effect()
  public deleteCourseByIdEffect$: Observable<Action> = this.actions$.pipe(
    ofType<courseActions.DeleteCourseByIdAction>(
      courseActions.ActionTypes.START_DELETING_COURSE,
    ),
    switchMap(action =>
      this.courseService.delete(action.payload.id).pipe(
        map(() => new courseActions.DeleteCourseByIdSuccessAction()),
        catchError(error =>
          of(new courseActions.DeleteCourseByIdErrorAction({error})),
        ),
      ),
    ),
  );
}
