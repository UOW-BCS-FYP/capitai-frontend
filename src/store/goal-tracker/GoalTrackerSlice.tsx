import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import { FetchFinancialGoalsRequestType, FetchFinancialGoalsResponseType, FetchFinancialGoalsStatChartDataRequestType, FetchFinancialGoalsStatChartDataResponseType, FinancialGoalType } from "src/types/goal-tracker";
import { AppDispatch, AppState } from "../Store";
// import { AppDispatch } from "../Store";

const API_URL = '/api/v1/goal-tracker';

interface StateType {
  total: number;
  goals: FinancialGoalType[];
  fetchGoalsStatus: string;
  fetchGoalsError: string | undefined;
  fetchGoalsFilter: FetchFinancialGoalsRequestType;
  arrangeGoalsStatus: string;
  arrangeGoalsError: string | undefined;
  addGoalStatus: string;
  addGoalError: string | undefined;
  deleteGoalStatus: string;
  deleteGoalError: string | undefined;
  updateGoalStatus: string;
  updateGoalError: string | undefined;
  statChartData: FetchFinancialGoalsStatChartDataResponseType | undefined;
  fetchStatChartDataStatus: string;
  fetchStatChartDataError: string | undefined;
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
  },
  arrangeGoalsStatus: 'idle',
  arrangeGoalsError: '',
  addGoalStatus: 'idle',
  addGoalError: '',
  updateGoalStatus: 'idle',
  updateGoalError: '',
  deleteGoalStatus: 'idle',
  deleteGoalError: '',
  statChartData: undefined,
  fetchStatChartDataStatus: 'idle',
  fetchStatChartDataError: ''
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
      // Fetch Goals
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
      // Add Goal
      .addCase(addGoal.pending, (state) => {
        state.addGoalStatus = 'loading';
      })
      .addCase(addGoal.fulfilled, (state) => {
        state.addGoalStatus = 'succeeded';
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.addGoalStatus = 'failed';
        state.addGoalError = action.error.message ?? 'failed to add goal';
      })
      // Update Goal
      .addCase(updateGoal.pending, (state) => {
        state.updateGoalStatus = 'loading';
      })
      .addCase(updateGoal.fulfilled, (state,) => {
        state.updateGoalStatus = 'succeeded';
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.updateGoalStatus = 'failed';
        state.updateGoalError = action.error.message ?? 'failed to update goal';
      })
      // Rearrange Goal
      .addCase(rearrangeGoal.pending, (state) => {
        state.arrangeGoalsStatus = 'loading';
      })
      .addCase(rearrangeGoal.fulfilled, (state, action) => {
        state.arrangeGoalsStatus = 'succeeded';
        state.goals = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(rearrangeGoal.rejected, (state, action) => {
        state.arrangeGoalsStatus = 'failed';
        state.arrangeGoalsError = action.error.message ?? 'failed to rearrange goals';
      })
      // stat chart data
      .addCase(getStatChartData.pending, (state) => {
        state.fetchStatChartDataStatus = 'loading';
      })
      .addCase(getStatChartData.fulfilled, (state, action) => {
        state.fetchStatChartDataStatus = 'succeeded';
        state.statChartData = action.payload;
      })
      .addCase(getStatChartData.rejected, (state, action) => {
        state.fetchStatChartDataStatus = 'failed';
        state.fetchStatChartDataError = action.error.message ?? 'failed to fetch stat chart data';
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
    // return {
    //   data: response.data.content,
    //   total: response.data.totalElements
    // };
    return response.data;
  } catch (err) {
    throw new Error();
  }
})

export const addGoal = createAsyncThunk<
  FinancialGoalType,
  FinancialGoalType,
  {
    state: AppState,
    dispatch: AppDispatch
  }
>('goal-tracker/addGoal', async (goal, thunkAPI) => {
  try {
    const { dispatch } = thunkAPI;
    const response = await axios.post(API_URL, goal);
    dispatch(fetchGoals({}));
    return response.data;
  } catch (err) {
    throw err as Error;
  }
})

export const updateGoal = createAsyncThunk<
  FinancialGoalType,
  FinancialGoalType,
  {
    state: AppState,
    dispatch: AppDispatch
  }
>('goal-tracker/updateGoal', async (goal, thunkAPI) => {
  try {
    const { dispatch } = thunkAPI;
    const response = await axios.put(`${API_URL}/${goal.id}`, goal);
    dispatch(fetchGoals({}));
    return response.data;
  } catch (err) {
    throw err as Error;
  }
})

export const deleteGoal = (id: number) => async () => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchGoals({});
  } catch (err) {
    throw err as Error;
  }
}

export const rearrangeGoal = createAsyncThunk<
  FetchFinancialGoalsResponseType,
  FinancialGoalType,
  {
    state: AppState,
    dispatch: AppDispatch
  }
>('goal-tracker/arrangeGoals', async (goal, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const { fetchGoalsFilter } = getState().goalTrackerReducer;  // get the updated filter
    const resutls = await axios.put(`${API_URL}/rearrange`, goal, {
      params: {
        query: fetchGoalsFilter.query,
        sortBy: fetchGoalsFilter.sortBy,
        sortOrder: fetchGoalsFilter.sortOrder,
        page: fetchGoalsFilter.page,
        rowsPerPage: fetchGoalsFilter.rowsPerPage
      }
    });
    return resutls.data;
    // dispatch(fetchGoals({}));
    // return {
    //   data: resutls.data.content,
    //   total: resutls.data.totalElements
    // };
  } catch (err) {
    throw err as Error;
  }
})

export const getStatChartData = createAsyncThunk<
  FetchFinancialGoalsStatChartDataResponseType,
  FetchFinancialGoalsStatChartDataRequestType,
  {
    state: AppState,
    dispatch: AppDispatch
  }
>('goal-tracker/getStatChartData', async () => {
  try {
    const response = await axios.get(`${API_URL}/stat-chart`);
    return response.data;
  } catch (err) {
    throw err as Error;
  }
})

export const { setFilter } = GoalTrackerSlice.actions;

export default GoalTrackerSlice.reducer;
