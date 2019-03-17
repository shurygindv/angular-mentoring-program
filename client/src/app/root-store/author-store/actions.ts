import {Action} from '@ngrx/store';

import {Author} from '../../core/models/author.interface';

export enum ActionTypes {
  START_FETCHING_ONE_AUTHOR_BY_ID = '[One Author] Fetch author by id',
  FINISH_FETCHING_ONE_AUTHOR_SUCCESS = '[One Author::success] Fetch author by id',
  FINISH_FETCHING_ONE_AUTHOR_ERROR = '[One Author::error] Fetch author by id',

  START_FETCHING_AUTHORS = '[Authors] Fetch all',
  FINISH_FETCHING_AUTHORS_SUCCESS = '[Authors::success] Fetch all',
  FINISH_FETCHING_AUTHORS_ERROR = '[Authors::error] Fetch all',
}

interface ErrorMsg {
  error: string;
}

/*
  FETCH BY ID
*/
interface FetchAuthorByIdPayload {
  id: string;
}

interface AuthorByIdSuccessPayload {
  item: Author;
}

export class FetchAuthorByIdAction implements Action {
  public readonly type = ActionTypes.START_FETCHING_ONE_AUTHOR_BY_ID;
  public readonly payload: FetchAuthorByIdPayload;

  constructor(payload: FetchAuthorByIdPayload) {
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

interface FetchAuthorsByIdPayload {
  items: Author[];
}

export class FetchAuthorsAction implements Action {
  public readonly type = ActionTypes.START_FETCHING_AUTHORS;
}

export class FetchAuthorsSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCHING_AUTHORS_SUCCESS;
  public readonly payload: FetchAuthorsByIdPayload;

  constructor(payload: FetchAuthorsByIdPayload) {
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


export type Actions =
  | FetchAuthorsAction
  | FetchAuthorsSuccessAction
  | FetchAuthorsErrorAction
  | FetchAuthorByIdAction
  | FetchAuthorByIdSuccessAction
  | FetchAuthorByIdErrorAction;
