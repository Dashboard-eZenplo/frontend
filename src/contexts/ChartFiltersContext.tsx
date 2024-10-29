import React, { createContext, useContext, useState, useCallback } from 'react';
import { IFiltersRequest, IGrade } from '../types/filtersData';
import { filterChartData } from '../services/filters/filtersService';

interface ChartFiltersContextProps {
  filtersRequest: IFiltersRequest;
  applyFilters: (newFilters: Partial<IFiltersRequest>) => void;
  good: number[];
  neutral: number[];
  bad: number[];
  fetchChartData: () => Promise<void>;
}

const ChartFiltersContext = createContext<ChartFiltersContextProps>({} as ChartFiltersContextProps);

export const ChartFiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filtersRequest, setFiltersRequest] = useState<IFiltersRequest>({
    periods: [],
    filters: {
      category: [],
      role: [],
      department: [],
      branch: []
    }
  });

  const [good, setGood] = useState<number[]>([0, 0, 0]);
  const [neutral, setNeutral] = useState<number[]>([0, 0, 0]);
  const [bad, setBad] = useState<number[]>([0, 0, 0]);

  const applyFilters = (newFilters: Partial<IFiltersRequest>) => {
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

  const fetchChartData = useCallback(async () => {
    try {
      const response = await filterChartData(filtersRequest);
      const goodValues = response.grades.map((grade: IGrade) => grade.good);
      const neutralValues = response.grades.map((grade: IGrade) => grade.neutral);
      const badValues = response.grades.map((grade: IGrade) => grade.bad);

      setGood(ensureThreeValues(goodValues));
      setNeutral(ensureThreeValues(neutralValues));
      setBad(ensureThreeValues(badValues));
    } catch (error) {
      console.error(error);
    }
  }, [filtersRequest]);

  return (
    <ChartFiltersContext.Provider
      value={{
        filtersRequest,
        applyFilters,
        good,
        neutral,
        bad,
        fetchChartData
      }}
    >
      {children}
    </ChartFiltersContext.Provider>
  );
};

export const useChartFilters = () => useContext(ChartFiltersContext);
