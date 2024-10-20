import React, { createContext, useContext, useEffect, useState } from 'react';
import { IFiltersRequest, IFiltersResponse } from '../types/filtersData';
import { filter } from '../services/filters/filtersService';

interface FiltersContextProps {
  filtersRequest: IFiltersRequest;
  applyFilters: (newFilters: Partial<IFiltersRequest>) => void;
  data: IFiltersResponse | null;
}

const FiltersContext = createContext<FiltersContextProps>({} as FiltersContextProps);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filtersRequest, setFiltersRequest] = useState<IFiltersRequest>({
    periods: [],
    filters: {
      category: []
    }
  });

  const [data, setData] = useState<IFiltersResponse | null>(null);

  const applyFilters: any = (newFilters: Partial<IFiltersRequest>) => {
    setFiltersRequest((prev) => ({
      periods: newFilters.periods ?? prev.periods,
      filters: {
        category: newFilters.filters?.category ?? prev.filters.category,
        role: newFilters.filters?.role ?? prev.filters.role,
        department: newFilters.filters?.department ?? prev.filters.department,
        branch: newFilters.filters?.branch ?? prev.filters.branch
      }
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Request data: ', JSON.stringify(filtersRequest));
        const response = await filter(filtersRequest);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (filtersRequest.periods.length > 0 || filtersRequest.filters.category.length > 0) {
      fetchData();
    }
  }, [filtersRequest]);

  return (
    <FiltersContext.Provider value={{ filtersRequest, applyFilters, data }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
