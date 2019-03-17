import * as Router from 'koa-router';

// auth section
import {mount as mountAuthorization} from './authorization/authorization-controller';
import {AuthorizationService} from './authorization/authorization-service';

// course section
import {mount as mountCourses} from './course/course-controller';
import {CourseService} from './course/course-service';

// author section 
import {mount as mountAuthors} from './author/author-controller';
import {AuthorService} from './author/author-service';

const connectAuthorizationModule = (): Router<{}, any> => mountAuthorization(new AuthorizationService());
const connectCourseModule = (): Router<{}, any> => mountCourses(new CourseService());
const connectAuthorModule = (): Router<{}, any> => mountAuthors(new AuthorService());

// product
export const bootstrap = (apiRouter: Router<{}, any>) => {
  apiRouter.use(connectAuthorizationModule().routes());
  apiRouter.use(connectCourseModule().routes());
  apiRouter.use(connectAuthorModule().routes());
};