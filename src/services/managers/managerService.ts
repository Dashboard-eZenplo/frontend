import api from '../../utils/api';

export const getManagers = async () => {
  try {
    const response = await api.get(`/managers`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching managers');
  }
};

export const deleteManager = async (id: number) => {
  try {
    await api.delete(`/managers/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error deleting manager');
  }
};
