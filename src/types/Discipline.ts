import { Result } from './Result';

export interface Discipline {
  id?: number;
  name: string;
  resultType: string;
  username: string; 
  results?: Result[];
}
