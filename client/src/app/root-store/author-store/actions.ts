import {Action} from '@ngrx/store';
import {Author} from '../../core/models/author.interface';

export enum ActionTypes {
  START_FETCHING_ONE_AUTHOR_BY_ID = '[One Author] Fetch author by id',
  FINISH_FETCHING_ONE_AUTHOR_SUCCESS = '[One Author::success] Fetch author by id',
  FINISH_FETCHING_ONE_AUTHOR_ERROR = '[One Author::error] Fetch author by id',

  START_FETCHING_AUTHORS = '[Authors] Fetch all',
  FINISH_FETCHING_AUTHORS_SUCCESS = '[Authors::success] Fetch all',
  FINISH_FETCHING_AUTHORS_ERROR = '[Authors::error] Fetch all',

  START_ADDING_AUTHOR = '[Authors] Add one',
  FINISH_ADDING_AUTHOR_SUCCESS = '[Authors::success] Add one',
  FINISH_ADDING_AUTHOR_ERROR = '[Authors::error] Add one',
}

interface ErrorMsg {
  error: string;
}

/*
  FETCH BY ID
*/
interface AuthorPayload {
  id: string;
}

interface AuthorByIdSuccessPayload {
  item: Author;
}

export class FetchAuthorByIdAction implements Action {
  public readonly type = ActionTypes.START_FETCHING_ONE_AUTHOR_BY_ID;
  public readonly payload: AuthorPayload;

  constructor(payload: AuthorPayload) {
    this.payload = payload;
  }
}

export class FetchAuthorByIdSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_ONE_AUTHOR_SUCCESS;
  public readonly payload: AuthorByIdSuccessPayload;

  constructor(payload: AuthorByIdSuccessPayload) {
    this.payload = payload;
  }
}

export class FetchAuthorByIdErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_ONE_AUTHOR_ERROR;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

/*
  FETCH ALL
*/

export class FetchAuthorsAction implements Action {
  public readonly type = ActionTypes.START_FETCHING_AUTHORS;
}

export class FetchAuthorsSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_AUTHORS_SUCCESS;
  public readonly payload: {items: Author[]};

  constructor(payload: {items: Author[]}) {
    this.payload = payload;
  }
}

export class FetchAuthorsErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_AUTHORS_ERROR;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

// add one

export class AddAuthorAction implements Action {
  public readonly type = ActionTypes.START_ADDING_AUTHOR;
  public readonly payload: {firstName: string, lastName: string};

  constructor(payload: {firstName: string, lastName: string}) {
    this.payload = payload;
  }
}

export class AddAuthorSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_ADDING_AUTHOR_SUCCESS;
  public readonly payload: {item: Author};

  constructor(payload: {item: Author}) {
    this.payload = payload;
  }
}

export class AddAuthorErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_ADDING_AUTHOR_ERROR;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

export type Actions =
  | AddAuthorAction
  | AddAuthorSuccessAction
  | AddAuthorErrorAction
  | FetchAuthorsAction
  | FetchAuthorsSuccessAction
  | FetchAuthorsErrorAction
  | FetchAuthorByIdAction
  | FetchAuthorByIdSuccessAction
  | FetchAuthorByIdErrorAction;
