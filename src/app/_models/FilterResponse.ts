import { StudentFrom } from './StudentForm';

export class FilterResponse<T> {
  members: T[] = [];
  totalPages: number = 0;
}