import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getEmployees = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axios.get(`${API_URL}/employee`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching employees:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Error fetching employees');
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error deleting employee');
  }
};
