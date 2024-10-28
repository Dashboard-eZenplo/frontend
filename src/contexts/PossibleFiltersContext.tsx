import React, { createContext, useContext, useEffect, useState } from 'react';
import { IPossibleFilters } from '../types/filtersData';
import { getPossibleFilters } from '../services/filters/filtersService';

interface PossibleFiltersContextProps {
  possibleFilters: IPossibleFilters;
}

const PossibleFiltersContext = createContext<PossibleFiltersContextProps>(
  {} as PossibleFiltersContextProps
);

export const PossibleFiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [possibleFilters, setPossibleFilters] = useState<IPossibleFilters>({
    periods: [],
    filters: {
      category: [],
      position: [],
      department: [],
      branch: []
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPossibleFilters();
        setPossibleFilters(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <PossibleFiltersContext.Provider value={{ possibleFilters }}>
      {children}
    </PossibleFiltersContext.Provider>
  );
};

export const usePossibleFilters = () => useContext(PossibleFiltersContext);
