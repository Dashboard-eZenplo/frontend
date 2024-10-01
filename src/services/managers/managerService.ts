import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getManagers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/list_managers/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const transformedData = response.data.managers.map((manager: any[]) => ({
      id: manager[0],
      nome: manager[1],
      email: manager[2],
      cnpj: manager[3],
      telefone: manager[4]
    }));

    return transformedData;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw new Error(error.response?.data?.message || 'Error fetching managers');
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
