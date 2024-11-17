import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  });

  const { access_token, refresh_token } = response.data;

  localStorage.setItem('accessToken', access_token);
  localStorage.setItem('refreshToken', refresh_token);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  redirectToLogin();
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('accessToken');
  return token !== null;
};

export const getToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${API_URL}/auth/refresh/`, { refresh_token: refreshToken });

    const newAccessToken = response.data.access_token;

    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error refreshing token');
  }
};

export const redirectToLogin = () => {
  window.location.href = '/';
};
