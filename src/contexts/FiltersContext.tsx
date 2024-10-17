import React, { createContext, useContext, useState } from 'react';
import { IFiltersRequest } from '../types/filtersData';

interface FiltersContextProps {
  filtersRequest: IFiltersRequest;
  applyFilters: (newFilters: IFiltersRequest) => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filtersRequest, setFiltersRequest] = useState<IFiltersRequest>({
    periods: [],
    filters: {
      category: []
    }
  });

  const applyFilters = (newFilters: IFiltersRequest) => {
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

  return (
    <FiltersContext.Provider value={{ filtersRequest, applyFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
