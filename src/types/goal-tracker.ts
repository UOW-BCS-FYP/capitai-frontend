export type FinancialGoalType = {
  id: number;
  title: string;
  type: string | 'capital building' | 'debt payment' | 'long term expense';
  amount: number;
  deadline: string;
  priority: number;
  completed: boolean;
};


export type SortOrder = 'asc' | 'desc';

export type FetchFinancialGoalsRequestType = {
  query?: string; // search query
  sortBy?: keyof FinancialGoalType; // sort by
  sortOrder?: SortOrder; // sort order
  page?: number; // current page
  rowsPerPage?: number; // rows per page
};

export type FetchFinancialGoalsResponseType = {
  data: FinancialGoalType[];
  total: number;
};
