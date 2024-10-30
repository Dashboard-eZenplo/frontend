import api from '../../utils/api';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getManagers = async () => {
  try {
    const response = await api.get(`${API_URL}/user/list_managers/`);

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
    await api.delete(`${API_URL}/user/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error deleting manager');
  }
};
