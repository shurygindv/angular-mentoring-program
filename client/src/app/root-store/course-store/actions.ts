import {Action} from '@ngrx/store';
import {Course} from '../../core/models/course.interface';

export enum ActionTypes {
  START_FETCHING_COURSE = '[Courses] Fetch course by id',
  FINISH_FETCHING_COURSE_SUCCESS = '[Courses::success] Fetch course by id',
  FINISH_FETCHING_COURSE_ERROR = '[Courses::error] Fetch course by id',

  START_FETCHING_COURSES = '[Courses] Fetch courses',
  FINISH_FETCHING_COURSES_SUCCESS = '[Courses::success] Fetch courses',
  FINISH_FETCHING_COURSES_ERROR = '[Courses::error] Fetch courses',

  START_UPDATING_COURSE = '[Courses] Update course',
  FINISH_UPDATING_COURSE_SUCCESS = '[Courses::success] Update course',
  FINISH_UPDATING_COURSE_ERROR = '[Courses::error] Update course',

  START_DELETING_COURSE = '[Courses] Delete course',
  FINISH_DELETING_COURSE_SUCCESS = '[Courses::success] Delete course',
  FINISH_DELETING_COURSE_ERROR = '[Courses::error] Delete course'
}

interface ErrorMsg {
  error: string;
}

// fetch all
export class FetchCoursesAction implements Action {
  public readonly type = ActionTypes.START_FETCHING_COURSE;
}

export class FetchCoursesSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_COURSES_SUCCESS;
  public readonly payload: {items: Course[]};

  constructor(payload: {items: Course[]}) {
    this.payload = payload;
  }
}

export class FetchCoursesErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_COURSES_ERROR;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

// fetch by id

export class FetchCourseByIdAction implements Action {
  public readonly type = ActionTypes.START_FETCHING_COURSE;
}

export class FetchCourseByIdSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_COURSE_SUCCESS;
}

export class FetchCourseByIdErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_COURSE_ERROR;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

// update
interface UpdatePayload {
  id: number;
  course: Course;
}

export class UpdateCourseByIdAction implements Action {
  public readonly type = ActionTypes.START_UPDATING_COURSE;
}

export class UpdateCourseSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_UPDATING_COURSE_SUCCESS;
}

export class UpdateCourseErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_UPDATING_COURSE_ERROR;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

// delete

export class DeleteCourseByIdAction implements Action {
  public readonly type = ActionTypes.START_DELETING_COURSE;
  public readonly payload: {id: number};

  constructor(payload: {id: number}) {
    this.payload = payload;
  }
}

export class DeleteCourseByIdSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_DELETING_COURSE_SUCCESS;
}

export class DeleteCourseByIdErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_DELETING_COURSE_ERROR;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

export type Actions =
  | FetchCoursesAction
  | FetchCoursesSuccessAction
  | FetchCoursesErrorAction
  | FetchCourseByIdAction
  | FetchCourseByIdSuccessAction
  | FetchCourseByIdErrorAction
  | UpdateCourseByIdAction
  | UpdateCourseSuccessAction
  | UpdateCourseErrorAction
  | DeleteCourseByIdErrorAction
  | DeleteCourseByIdSuccessAction
  | DeleteCourseByIdAction;
