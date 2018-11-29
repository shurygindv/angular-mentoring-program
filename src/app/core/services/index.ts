import { Provider } from '@angular/core';

import { ApiService } from './api.service';
import { UserService } from './user.service';
import { CourseService } from './course.service';

import { IService } from '../core.types';

type IAngularService = IService & Provider;

export const services: IAngularService[] = [
    ApiService,

    UserService,
    CourseService
];
