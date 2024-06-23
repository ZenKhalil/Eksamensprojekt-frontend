import api from './api';
import { Result } from '../types/Result';

export const getResults = async (): Promise<Result[]> => {
  const response = await api.get('/results');
  return response.data;
};

export const getResultById = async (id: number): Promise<Result> => {
  const response = await api.get(`/results/${id}`);
  return response.data;
};

export const createResult = async (result: Result): Promise<Result> => {
  const response = await api.post('/results', result);
  return response.data;
};

export const updateResult = async (id: number, result: Result): Promise<Result> => {
  const response = await api.put(`/results/${id}`, result);
  return response.data;
};

export const deleteResult = async (id: number): Promise<void> => {
  await api.delete(`/results/${id}`);
};
