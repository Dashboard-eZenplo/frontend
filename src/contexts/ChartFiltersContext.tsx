import React, { createContext, useContext, useState, useCallback } from 'react';
import { IFiltersRequest, IMeans } from '../types/filtersData';
import { filterChartData } from '../services/filters/filtersService';

interface ChartFiltersContextProps {
  filtersRequest: IFiltersRequest;
  applyFilters: (newFilters: Partial<IFiltersRequest>) => void;
  good: number[];
  neutral: number[];
  bad: number[];
  means: IMeans;
  labels: string[];
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
  hasMoreThanTwenty: boolean;
  setHasMoreThanTwentyEmployees: (value: boolean) => void;
  fetchChartData: () => Promise<void>;
}

const ChartFiltersContext = createContext<ChartFiltersContextProps>({} as ChartFiltersContextProps);

export const ChartFiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filtersRequest, setFiltersRequest] = useState<IFiltersRequest>({
    periods: {
      period1: {},
      period2: {},
      period3: {}
    },
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

  const [labels, setLabels] = useState<string[]>(['Bom', 'Razoável', 'Ruim']);
  const [means, setMeans] = useState<IMeans>({ mean1: null, mean2: null, mean3: null });

  const [hasMoreThanTwenty, setHasMoreThanTwenty] = useState<boolean>(true);

  const setHasMoreThanTwentyEmployees = (value: boolean) => {
    setHasMoreThanTwenty(value);
  };

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

  const fetchChartData = useCallback(async () => {
    try {
      const response = await filterChartData(filtersRequest);

      if (!response.message) {
        const goodValues = [
          response?.grades.grade1?.good ?? 0,
          response?.grades.grade2?.good ?? 0,
          response?.grades.grade3?.good ?? 0
        ];

        const neutralValues = [
          response?.grades.grade1?.neutral ?? 0,
          response?.grades.grade2?.neutral ?? 0,
          response?.grades.grade3?.neutral ?? 0
        ];

        const badValues = [
          response?.grades.grade1?.bad ?? 0,
          response?.grades.grade2?.bad ?? 0,
          response?.grades.grade3?.bad ?? 0
        ];

        setGood(goodValues);
        setNeutral(neutralValues);
        setBad(badValues);

        const period1Means = response?.means.mean1;

        const period2Means = response?.means.mean2;

        const period3Means = response?.means.mean3;

        setMeans({ mean1: period1Means, mean2: period2Means, mean3: period3Means });
      }
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
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
        means,
        labels,
        setLabels,
        hasMoreThanTwenty,
        setHasMoreThanTwentyEmployees,
        fetchChartData
      }}
    >
      {children}
    </ChartFiltersContext.Provider>
  );
};

export const useChartFilters = () => useContext(ChartFiltersContext);
