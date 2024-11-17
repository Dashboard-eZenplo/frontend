import api from '../../utils/api';

export const getSuperiorBarData = async (periods: any) => {
  try {
    const response = await api.post('/dashboard/info', periods);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 422) {
      return { message: 'Número insuficiente de usuários cadastrados para exibir os dados.' };
    }
    throw error;
  }
};
