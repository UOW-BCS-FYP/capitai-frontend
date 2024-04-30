import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'src/store/Store';
import { BudgetCategoryType, FetchBudgetCategoryRequestType, FetchBudgetCategoryResponseType } from 'src/types/smart-budgeting';

const API_URL = '/api/v1/smart-budgeting/budget-category';

interface StateType {
  // state: fetch budget category
  budgetCategories: BudgetCategoryType[];
  totalBudgetCategories: number;
  fetchBudgetCategoryFilter: FetchBudgetCategoryRequestType;
  fetchBudgetCategoryStatus: string;
  fetchBudgetCategoryError: string | undefined;
}

const initialState: StateType = {
  budgetCategories: [],
  totalBudgetCategories: 0,
  fetchBudgetCategoryFilter: {
    query: '',
    sortBy: undefined,
    sortOrder: 'asc',
    page: 0,
    rowsPerPage: 5
  },
  fetchBudgetCategoryStatus: 'idle',
  fetchBudgetCategoryError: ''
};

export const BudgetCategorySlice = createSlice({
  name: 'budgetCategory',
  initialState,
  reducers: {
    // getBudgetCtgy: (state, action) => {
    //     state.budgetCategories = action.payload;
    // },
    setFilter (state, action) {
      state.fetchBudgetCategoryFilter = {
        ...state.fetchBudgetCategoryFilter, // keep the existing properties
        ...action.payload // override the properties with the new values
      };
    }
    //SearchExpInc: (state, action) => {
    //    state.noteSearch = action.payload;
    //}
    //SelectNote: (state, action) => {
    //    state.notesContent = action.payload;
    //},
    
    //DeleteNote(state: StateType, action) {
    //    const index = state.notes.findIndex((note) => note.id === action.payload);
    //    state.notes.splice(index, 1);
    //},
    
    //UpdateNote: {
    //    reducer: (state: StateType, action: PayloadAction<any>) => {
    //        state.notes = state.notes.map((note) =>
      //            note.id === action.payload.id
    //                ? { ...note, [action.payload.field]: action.payload.value }
    //                : note,
    //        );
    //    },
    //    prepare: (id, field, value) => {
    //        return {
    //            payload: { id, field, value },
    //        };
    //    },
    //},
    
    //addNote: {
    //    reducer: (state: StateType, action: PayloadAction<any>) => {
    //        state.notes.push(action.payload);
    //    },
    //    prepare: (id, title, color) => {
    //        return { payload: { id, title, color, datef: new Date().toDateString(), deleted: false } };
    //    },
    //},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgetCtgy.pending, (state) => {
        state.fetchBudgetCategoryStatus = 'loading';
      })
      .addCase(fetchBudgetCtgy.fulfilled, (state, action) => {
        state.fetchBudgetCategoryStatus = 'succeeded';
        state.budgetCategories = action.payload.data;
        state.totalBudgetCategories = action.payload.total;
      });
  }
});

//export const { SearchNotes, getNotes, SelectNote, DeleteNote, UpdateNote, addNote } =
//    ExpectedIncomeSlice.actions;

export const { setFilter } = BudgetCategorySlice.actions;

export const fetchBudgetCtgy = createAsyncThunk<
  FetchBudgetCategoryResponseType,
  FetchBudgetCategoryRequestType,
  { dispatch: AppDispatch, state: AppState }
>('budgetCategory/fetchBudgetCtgy', async (filter, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  dispatch(setFilter(filter));  // update the filter
  const { fetchBudgetCategoryFilter } = getState().budgetCategoryReducer;  // get the updated filter
  const response = await axios.get(`${API_URL}`, {
    params: {
      ...fetchBudgetCategoryFilter
    }
  });
  return response.data;
});

export const addBudgetCtgy = createAsyncThunk<
  BudgetCategoryType,
  BudgetCategoryType,
  { dispatch: AppDispatch }
>('budgetCategory/addBudgetCtgy', async (budgetCategory) => {
  const response = await axios.post(`${API_URL}`, budgetCategory);
  return response.data;
});

export const updateBudgetCtgy = createAsyncThunk<
  BudgetCategoryType,
  BudgetCategoryType,
  { dispatch: AppDispatch }
>('budgetCategory/updateBudgetCtgy', async (budgetCategory) => {
  const response = await axios.put(`${API_URL}/${budgetCategory.id}`, budgetCategory);
  return response.data;
});

export const deleteBudgetCtgy = createAsyncThunk<
  BudgetCategoryType,
  BudgetCategoryType,
  { dispatch: AppDispatch }
>('budgetCategory/deleteBudgetCtgy', async (budgetCategory) => {
  const response = await axios.delete(`${API_URL}/${budgetCategory.id}`); 
  return response.data;
});

export default BudgetCategorySlice.reducer;
