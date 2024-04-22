import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import { FetchFinancialGoalsRequestType, FetchFinancialGoalsResponseType, FinancialGoalType } from "src/types/goal-tracker";
import { AppDispatch, AppState } from "../Store";
// import { AppDispatch } from "../Store";

const API_URL = '/api/v1/goal-tracker';

interface StateType {
  total: number;
  goals: FinancialGoalType[];
  // goalContent: number;
  // goalSearch: string;
  fetchGoalsStatus: string;
  fetchGoalsError: string | undefined;
  fetchGoalsFilter: FetchFinancialGoalsRequestType;
}

const initialState : StateType = {
  total: 0,
  goals: [],
  // goalContent: -1,
  // goalSearch: '',
  fetchGoalsStatus: 'idle',
  fetchGoalsError: '',
  fetchGoalsFilter: {
    query: '',
    sortBy: undefined,
    sortOrder: 'asc',
    page: 0,
    rowsPerPage: 10
  }
};

export const GoalTrackerSlice = createSlice({
  name: 'goal-tracker',
  initialState,
  reducers: {
    // setFilter (state, action: { payload?: StateType['fetchGoalsFilter'] }) {
    setFilter (state, action) {
      state.fetchGoalsFilter = {
        ...state.fetchGoalsFilter, // keep the existing properties
        ...action.payload // override the properties with the new values
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.fetchGoalsStatus = 'loading';
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.fetchGoalsStatus = 'succeeded';
        state.goals = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.fetchGoalsStatus = 'failed';
        state.fetchGoalsError = action.error.message ?? 'failed to fetch goals';
      })
  }
});

export const fetchGoals = createAsyncThunk<
  FetchFinancialGoalsResponseType,
  FetchFinancialGoalsRequestType,
  {
    state: AppState,
    dispatch: AppDispatch
  }
>('goal-tracker/fetchGoals', async (filter, thunkAPI) => {
  try {
    const { dispatch, getState } = thunkAPI;
    dispatch(setFilter(filter));  // update the filter
    const { fetchGoalsFilter } = getState().goalTrackerReducer;  // get the updated filter
    const response = await axios.get(API_URL, {
      params: {
        query: fetchGoalsFilter.query,
        sortBy: fetchGoalsFilter.sortBy,
        sortOrder: fetchGoalsFilter.sortOrder,
        page: fetchGoalsFilter.page,
        rowsPerPage: fetchGoalsFilter.rowsPerPage
      }
    });
    return response.data;
  } catch (err) {
    throw new Error();
  }
})

export const addGoal = (goal: FinancialGoalType) => async () => {
  try {
    await axios.post(API_URL, goal);
    fetchGoals({});
  } catch (err) {
    throw err as Error;
  }
}

export const updateGoal = (goal: FinancialGoalType) => async () => {
  try {
    await axios.put(`${API_URL}/${goal.id}`, goal);
    fetchGoals({});
  } catch (err) {
    throw err as Error;
  }
}

export const deleteGoal = (id: number) => async () => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchGoals({});
  } catch (err) {
    throw err as Error;
  }
}

export const { setFilter } = GoalTrackerSlice.actions;

export default GoalTrackerSlice.reducer;
