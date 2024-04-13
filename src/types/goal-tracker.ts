export type FinancialGoalType = {
  id: number;
  title: string;
  type: string | 'capital building' | 'debt payment' | 'long term expense';
  amount: number;
  deadline: string;
  priority: number;
  completed: boolean;
};
