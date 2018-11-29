import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { IService } from '@app/core/core.types';
import { ICourse } from '../../models/course.model';

interface ICourseService extends IService {
    fetchCourses(): Observable<ICourse[]>;
}

@Injectable()
export abstract class AbstractCourseService implements ICourseService {
    public abstract fetchCourses(): Observable<ICourse[]>;
}
