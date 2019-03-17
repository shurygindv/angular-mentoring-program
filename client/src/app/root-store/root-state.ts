import {CourseStoreState} from './course-store';
import {AuthStoreState} from './auth-store';

export interface State {
  courses: CourseStoreState.State;
  authors: AuthStoreState.State;
  auth: AuthStoreState.State;
}
