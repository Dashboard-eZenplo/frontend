export interface IFiltersRequest {
  periods: {
    initial_date: string;
    final_date: string;
  }[];
  filters: {
    category: string[];
    role?: string;
    department?: string;
    branch?: string;
  };
}

export interface IFiltersResponse {
  grades: {
    good: number;
    neutral: number;
    bad: number;
  }[];
}
