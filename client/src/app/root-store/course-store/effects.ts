import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';

import * as courseActions from './actions';

import {CourseService} from '../../core/services/course/course.service';
import {Course} from 'src/app/core/models/course.interface';
import {FetchCoursesAction} from './actions';
import {RootStoreState} from '..';

@Injectable()
export class CourseStoreEffects {
  constructor(
    private courseService: CourseService,
    private actions$: Actions,
    private store$: Store<RootStoreState.State>,
  ) {}

  @Effect()
  public addCourseEffect$: Observable<Action> = this.actions$.pipe(
    ofType<courseActions.AddCourseAction>(
      courseActions.ActionTypes.START_ADDING_COURSE,
    ),
    switchMap(action =>
      this.courseService.create(action.payload.course).pipe(
        map(() => new courseActions.AddCourseSuccessAction()),
        catchError(error =>
          of(new courseActions.AddCoursesErrorAction({error})),
        ),
      ),
    ),
  );

  @Effect()
  public fetchCoursesEffect$: Observable<Action> = this.actions$.pipe(
    ofType<courseActions.FetchCoursesAction>(
      courseActions.ActionTypes.START_FETCHING_COURSES,
    ),
    switchMap(action =>
      this.courseService.fetchCourses(action.payload).pipe(
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
    switchMap(action =>
      this.courseService.update(action.payload.id, action.payload.course).pipe(
        map(_ => new courseActions.UpdateCourseSuccessAction()),
        tap(() => this.store$.dispatch(new FetchCoursesAction())),
        catchError(error =>
          of(new courseActions.UpdateCourseErrorAction({error})),
        ),
      ),
    ),
  );

  @Effect()
  public filterBy$: Observable<Action> = this.actions$.pipe(
    ofType<courseActions.FilterCoursesAction>(
      courseActions.ActionTypes.START_FILTERING_COURSES,
    ),
    switchMap(action =>
      this.courseService.filterBy(action.payload.filterBy).pipe(
        map(
          (items: Course[]) =>
            new courseActions.FilterCoursesSuccessAction({items}),
        ),
        catchError(error =>
          of(new courseActions.FilterCoursesErrorAction({error})),
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
        tap(() => this.store$.dispatch(new FetchCoursesAction())),
        catchError(error =>
          of(new courseActions.DeleteCourseByIdErrorAction({error})),
        ),
      ),
    ),
  );
}
