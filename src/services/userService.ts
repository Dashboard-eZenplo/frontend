import { IHRManager } from '../types/HRManager';
import api from '../utils/api';

export const registerUser = async (userData: IHRManager) => {
  try {
    const response = await api.post(`/user/register`, userData);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    console.error('Error while registering user:', error);
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    console.error('Error while uploading file:', error);
    throw error;
  }
};
