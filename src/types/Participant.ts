import { Result } from './Result';
import { Discipline } from './Discipline';

export interface Participant {
  id?: number;
  name: string;
  gender: string;
  age: number;
  club: string;
  username: string; 
  results?: Result[];
  discipline?: Discipline;
  disciplineId?: number;
}
