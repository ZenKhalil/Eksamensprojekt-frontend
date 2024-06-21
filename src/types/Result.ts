import { Participant } from './Participant';
import { Discipline } from './Discipline';

export interface Result {
  id?: number;
  resultType: string;
  date: string; 
  resultValue: string;
  participantId?: number;
  disciplineId?: number;
  participant?: Participant;
  discipline?: Discipline;
}
