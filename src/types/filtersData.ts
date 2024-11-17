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

export interface IPossibleFilters {
  periods: IPeriod[];
  filters: {
    category: string[];
    position: string[];
    department: string[];
    branch: string[];
  };
}
