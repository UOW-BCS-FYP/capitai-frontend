import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import { FinancialGoalType } from "src/types/goal-tracker";
import { AppDispatch } from "../Store";

const API_URL = '/api/goal-tracker';

interface StateType {
  goals: FinancialGoalType[];
  goalContent: number;
  goalSearch: string;
  statusFetchGoals: string;
  errorFetchGoals: string | undefined;
}

const initialState = {
  goals: [],
  goalContent: -1,
  goalSearch: '',
  statusFetchGoals: 'idle',
  errorFetchGoals: ''
};

export const GoalTrackerSlice = createSlice({
  name: 'goal-tracker',
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.statusFetchGoals = 'loading';
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.statusFetchGoals = 'succeeded';
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.statusFetchGoals = 'failed';
        state.errorFetchGoals = action.error.message ?? 'failed to fetch goals';
      })
  }
});

export const fetchGoals = createAsyncThunk('goal-tracker/fetchGoals', async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    throw new Error();
  }
})

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
