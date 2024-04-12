import { createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import { FinancialGoalType } from "src/types/goal-tracker";
import { AppDispatch } from "../Store";

const API_URL = '/api/goal-tracker';

interface StateType {
  goals: FinancialGoalType[];
  goalContent: number;
  goalSearch: string;
}

const initialState = {
  goals: [],
  goalContent: -1,
  goalSearch: '',
};

export const GoalTrackerSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    getGoals: (state, action) => {
      console.log(action.payload)
      state.goals = action.payload;
    },
    SearchGoal: (state, action) => {
      state.goalSearch = action.payload;
    },
    SelectGoal: (state: StateType, action) => {
      state.goalContent = action.payload;
    }
  },
});

export const fetchGoals = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data)
    dispatch(getGoals(response.data));
  } catch (err) {
    console.log(err)
    throw new Error();
  }
}

export const addGoal = (goal: FinancialGoalType) => async () => {
  try {
    await axios.post(API_URL, goal);
    fetchGoals();
  } catch (err) {
    throw err as Error;
  }
}

export const updateGoal = (goal: FinancialGoalType) => async () => {
  try {
    await axios.put(`${API_URL}/${goal.id}`, goal);
    fetchGoals();
  } catch (err) {
    throw err as Error;
  }
}

export const deleteGoal = (id: number) => async () => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchGoals();
  } catch (err) {
    throw err as Error;
  }
}

export const { SearchGoal, getGoals, SelectGoal } = GoalTrackerSlice.actions;

export default GoalTrackerSlice.reducer;
