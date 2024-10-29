import React, { createContext, useContext, useState } from 'react';
import { IPossibleFilters } from '../types/filtersData';

interface PossibleFiltersContextProps {
  possibleFilters: IPossibleFilters;
  setPossibleFilters: (data: IPossibleFilters) => void;
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

  return (
    <PossibleFiltersContext.Provider value={{ possibleFilters, setPossibleFilters }}>
      {children}
    </PossibleFiltersContext.Provider>
  );
};

export const usePossibleFilters = () => useContext(PossibleFiltersContext);
