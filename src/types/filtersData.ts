export interface IPeriod {
  initial_date: string;
  final_date: string;
}

export interface IFiltersRequest {
  periods: {
    period1: IPeriod | object;
    period2: IPeriod | object;
    period3: IPeriod | object;
  };
  filters: {
    category: string[];
    role?: string[];
    department?: string[];
    branch?: string[];
  };
}

export interface IGrade {
  good: number;
  neutral: number;
  bad: number;
}

interface IMean {
  mean: number;
  quantity: number;
}

export interface IPeriodMean {
  mean: IMean;
  good_mean: IMean;
  neutral_mean: IMean;
  bad_mean: IMean;
}

export interface IFiltersResponse {
  grades: {
    grade1: IGrade | null;
    grade2: IGrade | null;
    grade3: IGrade | null;
  };
  means: {
    mean: IMean;
    good_mean: IMean;
    neutral_mean: IMean;
    bad_mean: IMean;
  }[];
}

export interface IPossibleFilters {
  periods: IPeriod[];
  filters: {
    category: string[];
    position: string[];
    department: string[];
    branch: string[];
  };
}
