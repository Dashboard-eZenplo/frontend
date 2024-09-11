import { apiBaseUrl } from '../utils/api';
import { IHRManager } from '../types/HRManager';

export const registerUser = async (userData: IHRManager) => {
  try {
    const response = await fetch(`${apiBaseUrl}/user/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const data = await response.json();
      const { message } = data;
      throw new Error(message);
    }

    return response;
  } catch (error) {
    console.error('Error while registering user:', error);
    throw error;
  }
};
