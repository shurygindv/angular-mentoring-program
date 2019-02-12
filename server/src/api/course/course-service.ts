import {courses as dbCourses} from './fake-db.json';
import { MaybeNull } from '../../types';

type Course = {
  id: number;
  name: string;
  description: string;
  isTopRated: boolean;
  authors: any[];
  length: number;
};

export interface ICourseService {
  findCourseById(id: number): Promise<MaybeNull<Course>>;
  findCourses(): Promise<Course[]>;

  takeCoursesByLength(from: number, take: number): Promise<Course[]>;
}

const courses: Course[] = dbCourses; // todo user type

const promisify = (data: any) => Promise.resolve(data);

export class CourseService implements ICourseService {
  // todo user service
  async findCourseById(id: number): Promise<MaybeNull<Course>> {
    return await promisify(courses.find(course => course.id === id) || null);
  }

  // todo user service
  async findCourses(): Promise<Course[]> {
    return await promisify([...courses]);
  }
  
  async takeCoursesByLength (from: number, take: number) {
    const courses = await this.findCourses();

    return promisify([...courses.slice(from, take)]);
  }
}
