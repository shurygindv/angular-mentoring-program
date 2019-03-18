import {Author} from './author.interface';

export interface Course {
  id?: number;
  name: string;
  isTopRated?: boolean;
  date: string | Date;
  length: number;
  description: string;
  authors: Author[];
}
