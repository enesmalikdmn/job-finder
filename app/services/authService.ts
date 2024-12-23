import axios from 'axios';
import { useUserStore } from '../../store/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_JOB_API_BASE_URL;

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { accessToken, refreshToken, user } = response.data;

    useUserStore.getState().setUser(user);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    const { accessToken, refreshToken, user } = response.data;

    useUserStore.getState().setUser(user);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};
