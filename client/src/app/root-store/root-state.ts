import {CourseStoreState} from './course-store';
import {AuthStoreState} from './auth-store';

export interface State {
  course: CourseStoreState.State;
  auth: AuthStoreState.State;
}
