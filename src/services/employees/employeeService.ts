import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employee`, {
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

export const deleteEmployee = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error deleting employee');
  }
};

export async function downloadCSVTemplate(): Promise<void> {
  try {
    const response = await axios.get('/csv/download-csv-template/', {
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'base_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading CSV template:', error);
    throw error;
  }
}
