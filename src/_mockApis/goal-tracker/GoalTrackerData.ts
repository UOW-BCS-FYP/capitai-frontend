import { FinancialGoalType } from "src/types/goal-tracker";
import mock from "../mock";

const FinancialGoalData: FinancialGoalType[] = [
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

// get all financial goals
mock.onGet("/api/goal-tracker").reply(200, FinancialGoalData);

// add a new financial goal
mock.onPost("/api/goal-tracker").reply((request) => {
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
mock.onPut("/api/goal-tracker/:id").reply((request) => {
  const id = request.params.id;
  const data = JSON.parse(request.data);
  const updatedGoal = FinancialGoalData.find((goal) => goal.id === id);
  if (!updatedGoal) return [400, { message: "Goal not found" }];
  Object.assign(updatedGoal, data);
  return [200, updatedGoal];
});

// delete a financial goal
mock.onDelete("/api/goal-tracker/:id").reply((request) => {
  const id = request.params.id;
  const index = FinancialGoalData.findIndex((goal) => goal.id === id);
  if (index === -1) return [400, { message: "Goal not found" }];
  FinancialGoalData.splice(index, 1);
  return [200, { id }];
});

export default FinancialGoalData;