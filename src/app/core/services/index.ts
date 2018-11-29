import { Provider } from '@angular/core';

import { IService } from '@app/core/core.types';

import { ApiService } from './api.service';
import { UserService, AbstractUserService } from './user';
import { CourseService, AbstractCourseService } from './course';

type IAngularService = IService & Provider;

export const services: IAngularService[] = [
    ApiService,

    { provide: AbstractUserService, useClass: UserService },
    { provide: AbstractCourseService, useClass: CourseService },
];
