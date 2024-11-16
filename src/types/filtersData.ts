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

export interface IGrades {
  grade1: boolean;
  grade2: boolean;
  grade3: boolean;
}

interface IMean {
  mean: number;
  quantity: number;
}

export interface IMeans {
  mean1: {
    mean: IMean;
    good_mean: IMean;
    neutral_mean: IMean;
    bad_mean: IMean;
  } | null;
  mean2: {
    mean: IMean;
    good_mean: IMean;
    neutral_mean: IMean;
    bad_mean: IMean;
  } | null;
  mean3: {
    mean: IMean;
    good_mean: IMean;
    neutral_mean: IMean;
    bad_mean: IMean;
  } | null;
}

export interface IPeriodMean {
  mean: IMean;
  good_mean: IMean;
  neutral_mean: IMean;
  bad_mean: IMean;
}

export interface IPeriodsMean {
  period1: IPeriodMean | null;
  period2: IPeriodMean | null;
  period3: IPeriodMean | null;
}

export interface IFiltersResponse {
  grades: {
    grade1: IGrade | null;
    grade2: IGrade | null;
    grade3: IGrade | null;
  };
  means: IMeans;
}
[];

export interface IPossibleFilters {
  periods: IPeriod[];
  filters: {
    category: string[];
    position: string[];
    department: string[];
    branch: string[];
  };
}
