import axios from 'axios';
import { Manager } from '../../models/Manager';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getManagers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/list_managers/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    const jsonString = JSON.stringify(response.data.managers.map((managerArray: any[]) => ({
      id: managerArray[0],
      nome: managerArray[1],
      email: managerArray[2],
      cnpj: managerArray[3],
      telefone: managerArray[4]
    })));

    const managers: Manager[] = JSON.parse(jsonString);

    return managers;
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
