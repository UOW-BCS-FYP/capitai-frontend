import { FetchFinancialGoalsRequestType, FinancialGoalType } from "src/types/goal-tracker";
import mock from "../../../mock";

let FinancialGoalData: FinancialGoalType[] = [
  {
    id: 1,
    title: "Capital Building",
    type: "capital building",
    amount: 10000,
    deadline: "2022-12-31",
    priority: 1,
    completed: false,
  },
  {
    id: 2,
    title: "Debt Payment",
    type: "debt payment",
    amount: 5000,
    deadline: "2022-12-31",
    priority: 2,
    completed: false,
  },
  {
    id: 3,
    title: "Long Term Expense",
    type: "long term expense",
    amount: 2000,
    deadline: "2022-12-31",
    priority: 3,
    completed: false,
  },
  {
    id: 4,
    title: "Capital Building",
    type: "capital building",
    amount: 10000,
    deadline: "2022-12-31",
    priority: 4,
    completed: false,
  },
  {
    id: 5,
    title: "Debt Payment",
    type: "debt payment",
    amount: 5000,
    deadline: "2022-12-31",
    priority: 5,
    completed: false,
  },
  {
    id: 6,
    title: "Long Term Expense",
    type: "long term expense",
    amount: 2000,
    deadline: "2022-12-31",
    priority: 6,
    completed: false,
  },
  {
    id: 7,
    title: "Capital Building",
    type: "capital building",
    amount: 10000,
    deadline: "2022-12-31",
    priority: 7,
    completed: false,
  },
  {
    id: 8,
    title: "Debt Payment",
    type: "debt payment",
    amount: 5000,
    deadline: "2022-12-31",
    priority: 8,
    completed: false,
  },
  {
    id: 9,
    title: "Long Term Expense",
    type: "long term expense",
    amount: 2000,
    deadline: "2022-12-31",
    priority: 9,
    completed: false,
  },
  {
    id: 10,
    title: "Capital Building",
    type: "capital building",
    amount: 10000,
    deadline: "2022-12-31",
    priority: 10,
    completed: false,
  },
  {
    id: 11,
    title: "Debt Payment",
    type: "debt payment",
    amount: 5000,
    deadline: "2022-12-31",
    priority: 11,
    completed: false,
  },
  {
    id: 12,
    title: "Long Term Expense",
    type: "long term expense",
    amount: 2000,
    deadline: "2022-12-31",
    priority: 12,
    completed: false,
  }
];

function getGoals(query: string, sortBy: keyof FinancialGoalType | undefined, sortOrder: "asc" | "desc", page: number, rowsPerPage: number) {
  let goals = FinancialGoalData;
  if (query) {
    goals = goals.filter((goal) => goal.title.toLowerCase().includes(query.toLowerCase()));
  }
  if (sortBy) {
    goals = goals.sort((a, b) => {
      const aVal = a[sortBy] ?? 0;
      const bVal = b[sortBy] ?? 0;
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }
  const total = goals.length;
  goals = goals.slice(page! * rowsPerPage!, page! * rowsPerPage! + rowsPerPage!);
  return {
    data: goals,
    total
  };
}

// get all financial goals
mock.onGet("/api/v1/goal-tracker").reply((request) => {
  const { query, sortBy, sortOrder, page, rowsPerPage }: FetchFinancialGoalsRequestType = {
    query: "",
    sortBy: undefined,
    sortOrder: "asc",
    page: 0,
    rowsPerPage: 10,
    ...request.params,
  };
  return [200, getGoals(query!, sortBy, sortOrder!, page!, rowsPerPage!)];
});

// add a new financial goal
mock.onPost("/api/v1/goal-tracker").reply((request) => {
  const data = JSON.parse(request.data);
  const newGoal: FinancialGoalType = {
    id: FinancialGoalData.length + 1,
    title: data.title,
    type: data.type,
    amount: data.amount,
    deadline: data.deadline,
    priority: data.priority,
    completed: false,
  };
  FinancialGoalData.push(newGoal);
  return [200, newGoal];
});

// update a financial goal
mock.onPut(new RegExp("/api/v1/goal-tracker/*")).reply((request) => {
  // const id = request.params.id;
  const match = request.url?.match(/\/api\/v1\/goal-tracker\/(.*)/);
  const id = match ? parseInt(match[1]) : 0;
  const data = JSON.parse(request.data);
  const updatedGoal = FinancialGoalData.find((goal) => goal.id === id);
  if (!updatedGoal) return [400, { message: "Goal not found" }];
  Object.assign(updatedGoal, data);
  return [200, updatedGoal];
});

// delete a financial goal
mock.onDelete("/api/v1/goal-tracker/:id").reply((request) => {
  const id = request.params.id;
  const index = FinancialGoalData.findIndex((goal) => goal.id === id);
  if (index === -1) return [400, { message: "Goal not found" }];
  FinancialGoalData.splice(index, 1);
  return [200, { id }];
});

// rearrange financial goal
mock.onPut("/api/v1/goal-tracker/rearrange").reply((request) => {
  const { query, sortBy, sortOrder, page, rowsPerPage }: FetchFinancialGoalsRequestType = {
    query: "",
    sortBy: undefined,
    sortOrder: "asc",
    page: 0,
    rowsPerPage: 10,
    ...request.params,
  };
  const data = JSON.parse(request.data);
  console.log(data)
  const sortedData = FinancialGoalData.sort((a: FinancialGoalType, b: FinancialGoalType) => a.priority - b.priority);
  const oldPriority = sortedData.find((goal) => goal.id === data?.id)?.priority; // 5
  const newPriority = data.priority; // 4
  if (oldPriority === undefined) return [400, { message: "Goal not found" }];
  if (oldPriority === newPriority) return [200, { message: "No change" }];
  const direction = oldPriority < newPriority ? 1 : -1;
  sortedData.forEach((goal) => {
    if (goal.id === data.id) return;
    if (direction === 1 && goal.priority > oldPriority && goal.priority <= newPriority) {
      goal.priority -= 1;
    }
    if (direction === -1 && goal.priority < oldPriority && goal.priority >= newPriority) {
      goal.priority += 1;
    }
  });
  sortedData.find((goal) => goal.id === data.id)!.priority = newPriority;
  return [200, getGoals(query!, sortBy, sortOrder!, page!, rowsPerPage!)];
});

// stat for financial goals
// can be used to show the total number of goals, completed goals, and total amount of goals

export default FinancialGoalData;