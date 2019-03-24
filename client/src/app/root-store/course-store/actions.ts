import {Action} from '@ngrx/store';
import {Course} from '../../core/models/course.interface';

export enum ActionTypes {
  START_ADDING_COURSE = '[Courses] Add course',
  FINISH_ADDING_COURSE_SUCCESS = '[Courses::success] Add course',
  FINISH_ADDING_COURSE_FAIL = '[Courses::error] Add course',

  START_FETCHING_COURSE = '[Courses] Fetch course by id',
  FINISH_FETCHING_COURSE_SUCCESS = '[Courses::success] Fetch course by id',
  FINISH_FETCHING_COURSE_FAIL = '[Courses::error] Fetch course by id',

  START_FILTERING_COURSES = '[Course filter] fetch filtered items',
  FINISH_FILTERING_COURSES_SUCCESS = '[Course filter::success] fetch filtered items',
  FINISH_FILTERING_COURSES_FAIL = '[Course filter::error] fetch filtered items',

  START_FETCHING_COURSES = '[Courses] Fetch courses',
  FINISH_FETCHING_COURSES_SUCCESS = '[Courses::success] Fetch courses',
  FINISH_FETCHING_COURSES_FAIL = '[Courses::error] Fetch courses',

  START_UPDATING_COURSE = '[Courses] Update course',
  FINISH_UPDATING_COURSE_SUCCESS = '[Courses::success] Update course',
  FINISH_UPDATING_COURSE_FAIL = '[Courses::error] Update course',

  START_DELETING_COURSE = '[Courses] Delete course',
  FINISH_DELETING_COURSE_SUCCESS = '[Courses::success] Delete course',
  FINISH_DELETING_COURSE_FAIL = '[Courses::error] Delete course',
}

interface ErrorMsg {
  error: string;
}

// fetch all

interface FetchCoursesPayload {
  take?: number;
  from?: number;
}

export class FetchCoursesAction implements Action {
  public readonly type = ActionTypes.START_FETCHING_COURSES;
  public readonly payload: FetchCoursesPayload;

  constructor(payload?: FetchCoursesPayload) {
    this.payload = payload || {
      take: 10,
      from: 0,
    };
  }
}

export class FetchCoursesSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_COURSES_SUCCESS;
  public readonly payload: {items: Course[]};

  constructor(payload: {items: Course[]}) {
    this.payload = payload;
  }
}

export class FetchCoursesErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_COURSES_FAIL;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

// add

interface AddCoursePayload {
  course: Course;
}

export class AddCourseAction implements Action {
  public readonly type = ActionTypes.START_ADDING_COURSE;
  public readonly payload: AddCoursePayload;

  constructor(payload: AddCoursePayload) {
    this.payload = payload;
  }
}

export class AddCourseSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_ADDING_COURSE_SUCCESS;
}

export class AddCoursesErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_ADDING_COURSE_FAIL;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

// filterby
interface FilterPayload {
  filterBy: string;
}

export class FilterCoursesAction implements Action {
  public readonly type = ActionTypes.START_FILTERING_COURSES;
  public readonly payload: FilterPayload;

  constructor(payload: FilterPayload) {
    this.payload = payload;
  }
}

export class FilterCoursesSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_FILTERING_COURSES_SUCCESS;
  public readonly payload: {items: Course[]};

  constructor(payload: {items: Course[]}) {
    this.payload = payload;
  }
}

export class FilterCoursesErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_FILTERING_COURSES_FAIL;
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
  public readonly type = ActionTypes.FINISH_FETCHING_COURSE_FAIL;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

// update
interface UpdateCoursePayload {
  id: number;
  course: Course;
}

export class UpdateCourseByIdAction implements Action {
  public readonly type = ActionTypes.START_UPDATING_COURSE;
  public readonly payload: UpdateCoursePayload;

  constructor(payload: UpdateCoursePayload) {
    this.payload = payload;
  }
}

export class UpdateCourseSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_UPDATING_COURSE_SUCCESS;
}

export class UpdateCourseErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_UPDATING_COURSE_FAIL;
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
  public readonly type = ActionTypes.FINISH_DELETING_COURSE_FAIL;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

export type Actions =
  | AddCourseAction
  | AddCourseSuccessAction
  | AddCoursesErrorAction
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
  | DeleteCourseByIdAction
  | FilterCoursesAction
  | FilterCoursesSuccessAction
  | FilterCoursesErrorAction;
