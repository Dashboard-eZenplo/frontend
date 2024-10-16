import { IFiltersRequest } from '../../types/filtersData';
import api from '../../utils/api';

export const filter = async (filtersData: IFiltersRequest) => {
  try {
    const response = await api.post('/dashboard', filtersData);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};