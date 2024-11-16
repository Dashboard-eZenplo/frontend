import { IFiltersRequest } from '../../types/filtersData';
import api from '../../utils/api';

export const filterChartData = async (filtersData: IFiltersRequest) => {
  try {
    const response = await api.post(`/dashboard/`, filtersData);

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 422) {
      return { message: 'Número insuficiente de usuários cadastrados para exibir os dados.' };
    }
    throw error;
  }
};

export const getPossibleFilters = async () => {
  try {
    const response = await api.get(`/dashboard/`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
