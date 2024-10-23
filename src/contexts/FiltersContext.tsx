import React, { createContext, useContext, useEffect, useState } from 'react';
import { IFiltersRequest, IFiltersResponse } from '../types/filtersData';
import { filter } from '../services/filters/filtersService';

interface FiltersContextProps {
  filtersRequest: IFiltersRequest;
  applyFilters: (newFilters: Partial<IFiltersRequest>) => void;
  data: IFiltersResponse | null;
  good: number[];
  neutral: number[];
  bad: number[];
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

  const [good, setGood] = useState<number[]>([0, 0, 0]);
  const [neutral, setNeutral] = useState<number[]>([0, 0, 0]);
  const [bad, setBad] = useState<number[]>([0, 0, 0]);

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

  const ensureThreeValues = (arr: number[]): number[] => {
    const defaultArray = [0, 0, 0];
    return arr.length === 3 ? arr : [...arr, ...defaultArray].slice(0, 3);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Request data: ', filtersRequest);
        const response = await filter(filtersRequest);

        setGood(ensureThreeValues(response.good));
        setNeutral(ensureThreeValues(response.neutral));
        setBad(ensureThreeValues(response.bad));

        // setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (filtersRequest.periods.length > 0) {
      fetchData();
    }
  }, [filtersRequest]);

  return (
    <FiltersContext.Provider value={{ filtersRequest, applyFilters, data, good, neutral, bad }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
