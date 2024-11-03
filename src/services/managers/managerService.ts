import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '');

export const getManagers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/list_managers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }
    throw new Error(error || 'Error fetching managers');
  }
};

export const deleteManager = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error deleting manager');
  }
};
