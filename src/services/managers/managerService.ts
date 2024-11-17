import api from '../../utils/api';

export const getManagers = async () => {
  try {
    const response = await api.get(`/user/list_managers`);
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
    await api.delete(`/user/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error deleting manager');
  }
};
