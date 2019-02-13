import { courses as dbCourses } from './fake-db.json';
import { MaybeNull } from '../../types';

type Course = {
  id?: number;
  name: string;
  date: string;
  description: string;
  isTopRated: boolean;
  authors?: any[];
  length: number;
};

export interface ICourseService {
  findCourseById(id: number): Promise<MaybeNull<Course>>;
  findCourses(): Promise<Course[]>;

  takeCoursesByLength(from: number, take: number): Promise<Course[]>;
  filterByTextFragment(value: string): Promise<Course[]>;
  addCourse(course: Course): Promise<Course>;
  deleteCourseById(id: number): Promise<boolean>;
  updateCourseById(id: number, course: Course): Promise<boolean>;
}

let courses: any[] = dbCourses; // todo user type
let id = 0;

const promisify = (data: any) => Promise.resolve(data);
const uppercase = (value: string) => value.toUpperCase();

export class CourseService implements ICourseService {
  // todo user service
  async findCourseById(id: number): Promise<MaybeNull<Course>> {
    return await promisify(courses.find(course => course.id === id) || null);
  }

  // todo user service
  async findCourses(): Promise<Course[]> {
    return await promisify([...courses]);
  }

  async takeCoursesByLength(from: number, take: number) {
    const courses = await this.findCourses();

    return await promisify([...courses.slice(from, from + take)]);
  }

  async filterByTextFragment(value: string) {
    const normalized = uppercase(value);

    const includeDescription = (course: Course) =>
      uppercase(course.description).includes(normalized);

    const includeName = (course: Course) =>
      uppercase(course.name).includes(normalized);

    const filtered = courses.filter(course => {
      return includeDescription(course) || includeName(course);
    });

    return await promisify([...filtered]);
  }

  async deleteCourseById(id: number) {
    const found: number = courses.findIndex(course => course.id === id);

    courses.splice(found, 1);

    return await promisify(true);
  }

  async updateCourseById(id: number, updated: Course) {
    const index: number = courses.findIndex(course => course.id === id);

    courses[index] = updated;

    return await promisify(true);
  }

  async addCourse(added: Course) {
    const newItem = { ...added, id: id++ };

    courses = [newItem, ...courses];

    return await promisify(newItem);
  }
}
