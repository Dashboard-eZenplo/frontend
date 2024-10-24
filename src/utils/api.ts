import axios from 'axios';
import { isTokenExpired } from './jwt-decoder';
import { refreshAccessToken, redirectToLogin } from '../services/auth/authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      if (config.url !== '/login') {
        if (isTokenExpired(token)) {
          try {
            const newAccessToken = await refreshAccessToken();
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          } catch (error) {
            console.error('Failed to refresh token:', error);
            redirectToLogin();
          }
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403) {
      console.error('Permission denied:', error.response.data.detail);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error('Failed to refresh token:', error);
        redirectToLogin();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
