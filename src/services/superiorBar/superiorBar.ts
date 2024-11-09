import api from '../../utils/api';

export const getSuperiorBarData = async () => {
  try {
    const response = await api.get('/dashboard/info');

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
