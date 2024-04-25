// capital building: goal title, goal amount, and goal deadline
// debt payment: debt title, the total debt amount, debt interest, and payment interval
// long term expense: expense title, expense amount, and expense frequency

// features:
// add a new goal
// rearrange the goals
// click goal and redirect to goal history page
// history page: see the progress, and completed date of the goal
// visit “capital building” goal, should see progress and completed date of this goal
// visit “debt payment” goal, should see the current remaining debt and how many more months do I need to finish the debt payment. The progress, interest paid, completed date, and remaining debt of every payment interval are also listed
// visit “long term expense” goal, should see the progress and completed date of every expense frequency

export type FinancialGoalType = {
  id?: number;
  title: string;
  type: string | 'capital building' | 'debt payment' | 'long term expense';
  amount: number;
  priority: number;
  completed: boolean;
  // capital building
  deadline?: string;
  // debt payment
  interest?: number;
  paymentInterval?: number;
  // long term expense
  frequency?: number;
  // progress
  progress?: number;
  completedDate?: string;
  remainingDebt?: number;
  interestPaid?: number;
  remainingMonths?: number;
  completedDates?: string[];
};

export type FinancialGoalProgressType = {
  id: number; // progress id
  goalId: number;
  progress: number;
  completedDate: string;
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
