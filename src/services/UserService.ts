import api from './api';

export const getCurrentUser = async (): Promise<any> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found');
    return null; // Or handle this case as needed
  }

  try {
    const response = await api.get('/api/currentUser');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};
