import api from './api';
import { Participant } from '../types/Participant';

export const getParticipants = async (): Promise<Participant[]> => {
  const response = await api.get('/participants');
  return response.data;
};

export const getParticipantById = async (id: number): Promise<Participant> => {
  const response = await api.get(`/participants/${id}`);
  return response.data;
};

export const createParticipant = async (participant: Participant): Promise<Participant> => {
  const response = await api.post('/participants', participant);
  return response.data;
};

export const updateParticipant = async (id: number, participant: Participant): Promise<Participant> => {
  const response = await api.put(`/participants/${id}`, participant);
  return response.data;
};

export const deleteParticipant = async (id: number): Promise<void> => {
  await api.delete(`/participants/${id}`);
};
