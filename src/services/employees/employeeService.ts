import api from '../../utils/api';

export const getEmployees = async () => {
  try {
    const response = await api.get(`/employee`);

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }
    throw new Error(error || 'Error fetching employees');
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    await api.delete(`/employee/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error deleting employee');
  }
};
