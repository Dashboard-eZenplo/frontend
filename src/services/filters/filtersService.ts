import { IFiltersRequest } from '../../types/filtersData';
import api from '../../utils/api';

export const filterChartData = async (filtersData: IFiltersRequest) => {
  try {
    const response = await api.post(`/dashboard/`, filtersData);

    return response.data;
  } catch (error) {
    console.error(error);
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
