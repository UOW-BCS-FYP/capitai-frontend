// Requirement
// gt-1
// Goal Tracking Card
// User
// When I visit main page with goal tracking card enabled, I should see a bar chart displaying the progress of my highest priority goal that is not completed

// gt-2
// Goal Creation Page
// User
// When I finish creating my account or click “add goal” button, I should see the goal creation page where I can specify goal type

// gt-3
// Goal Creation - Capital Building
// User
// When I specify goal type as “capital building”, I should be asked for goal title, goal amount and goal deadline

// gt-4
// Goal Creation - Debt Payment
// User
// When I specify goal type as “debt payment”, I should be asked for debt title, total debt amount, debt interest and payment interval

// gt-5
// Goal creation - Long Term Expense
// User
// When I specify goal type as “long term expense”, I should be asked for expense title, expense amount and expense interval

// gt-6
// Goal Tracking Page
// User
// When I click on the goal tracking card, I should see an “add goal” button, all of my financial goals in order of priority and utility buttons for each goal

// gt-7
// Priority Rearrangement
// User
// When I drag and drop goals on goal tracking page, the priority of goals should be rearranged

// gt-8
// Goal History Page
// User
// When I click on a goal record on goal tracking page, I should be redirected to goal history page for this goal

// gt-9
// Goal History - Capital Building
// User
// When I visit the goal history page of a “capital building” goal, I should see the progress and completed date of this goal

// gt-10
// Goal History - Debt Payment
// User
// When I visit the goal history page of a “debt payment” goal, I should see the current remaining debt and how many more months do I need to finish debt payment. The progress, interest paid, completed date, and remaining debt of every payment interval are also listed

// gt-11
// Goal History - Long Term Expense
// User
// When I visit the goal history page of a “long term expense” goal, I should see the progress and completed date of every expense interval
 
export type FinancialGoalType = {
  id: number;
  title: string;
  type: string | 'capital building' | 'debt payment' | 'long term expense';
  amount: number;
  deadline: string;
  priority: number;
  completed: boolean;
};
