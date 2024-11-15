import api from '../../utils/api';

export const getSuperiorBarData = async () => {
  try {
    const response = await api.post('/dashboard/info');
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 422) {
      return { message: 'Número insuficiente de usuários cadastrados para exibir os dados.' };
    }
    throw error;
  }
};
