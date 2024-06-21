import { Result } from './Result';

export interface Participant {
  id?: number;
  name: string;
  gender: string;
  age: number;
  club: string;
  username: string; 
  results?: Result[];
}
