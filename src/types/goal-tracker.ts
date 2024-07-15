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
  // progress fields - calculated by the system
  progress?: number;
  completedDate?: string;
  remainingDebt?: number;
  interestPaid?: number;
  remainingMonths?: number;
  completedDates?: string[];
};

export type FinancialGoalTaskType = {
  id: number;
  title: string;
  amount: number;
  deadline: string;
  completed: boolean;
  completedDate: string;
};

export type FinancialGoalProgressType = {
  id: number; // progress id
  goalId: number;
  completedDate: string;
  // debt payment progress fields
  // interestPaid: number;
  // long term expense progress fields
  // expenseFrequency: number;
  // process fields - calculated by the system
  progress: number;
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

export type FetchFinancialGoalsStatChartDataRequestType = {
};

export type FetchFinancialGoalsStatChartDataResponseType = {
  capitalBuilding: {
    thisYear: number;
    lastYear: number;
  };
  debtPayment: {
    thisYear: number;
    lastYear: number;
    repayment: Array<{
      month: string;
      amount: number;
    }>;
  };
  longTermExpense: {
    expenses: Array<{
      month: string;
      amount: number;
    }>;
  }
};