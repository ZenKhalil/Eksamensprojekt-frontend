import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    
    const response = await axios.get(`${BASE_URL}/currentUser`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};
