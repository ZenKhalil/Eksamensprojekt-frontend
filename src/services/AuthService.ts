import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Update the port to match your Spring Boot application

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Login failed');
    }
  }
};

export const signup = async (username: string, password: string) => {
  await axios.post(`${BASE_URL}/signup`, { username, password });
};
