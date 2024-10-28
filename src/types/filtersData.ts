interface IPeriod {
  initial_date: string;
  final_date: string;
}

export interface IFiltersRequest {
  periods: IPeriod[];
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

export interface IFiltersResponse {
  grades: IGrade[];
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
