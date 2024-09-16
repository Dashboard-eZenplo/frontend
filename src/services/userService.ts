import { IHRManager } from '../types/HRManager';
import api from '../utils/api';

export const registerUser = async (userData: IHRManager) => {
  try {
    const response = await api.post(`/user/register/`, userData);

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
