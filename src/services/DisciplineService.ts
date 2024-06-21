import api from './api';
import { Discipline } from '../types/Discipline';

export const getDisciplines = async (): Promise<Discipline[]> => {
  const response = await api.get('/disciplines');
  console.log('Disciplines response:', response.data); // Add this line
  return response.data;
};

export const getDisciplineById = async (id: number): Promise<Discipline> => {
  const response = await api.get(`/disciplines/${id}`);
  console.log('Discipline by ID response:', response.data); // Add this line
  return response.data;
};

export const createDiscipline = async (discipline: Discipline): Promise<Discipline> => {
  const response = await api.post('/disciplines', discipline);
  console.log('Create discipline response:', response.data); // Add this line
  return response.data;
};

export const updateDiscipline = async (id: number, discipline: Discipline): Promise<Discipline> => {
  const response = await api.put(`/disciplines/${id}`, discipline);
  console.log('Update discipline response:', response.data); // Add this line
  return response.data;
};

export const deleteDiscipline = async (id: number): Promise<void> => {
  const response = await api.delete(`/disciplines/${id}`);
  console.log('Delete discipline response:', response.data); // Add this line
};
