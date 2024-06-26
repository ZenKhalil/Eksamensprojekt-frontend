import api from './api';
import { Discipline } from '../types/Discipline';

export const getDisciplines = async (): Promise<Discipline[]> => {
  const response = await api.get('/disciplines');
  return response.data;
};

export const getDisciplineById = async (id: number): Promise<Discipline> => {
  const response = await api.get(`/disciplines/${id}`);
  return response.data;
};

export const createDiscipline = async (discipline: Discipline): Promise<Discipline> => {
  const response = await api.post('/disciplines', discipline);
  return response.data;
};

export const updateDiscipline = async (id: number, discipline: Discipline): Promise<Discipline> => {
  const response = await api.put(`/disciplines/${id}`, discipline);
  return response.data;
};

export const deleteDiscipline = async (id: number): Promise<void> => {
  await api.delete(`/disciplines/${id}`);
};
