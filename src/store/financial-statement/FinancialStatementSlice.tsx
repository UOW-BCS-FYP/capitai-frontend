import axios from '../../utils/axios';
import { asyncThunkCreator, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { uniqueId } from 'lodash';
import { sub } from 'date-fns';
import { PersonalFinanceStatementType } from 'src/types/financial-statement';

const API_URL = '/api/financial-statement';

interface StateType {
  statements: PersonalFinanceStatementType[];
  statementContent: number;
  statementSearch: string;
  statusFetchStatements: string;
  errorFetchStatements: string | undefined;
}

const initialState = {
  statements: [],
  statementContent: 1,
  statementSearch: '',
  statusFetchStatements: 'idle',
  errorFetchStatements: ''
};

export const FinancialStatementSlice = createSlice({
  name: 'financial-statement',
  initialState,
  reducers: {
    getStatements: (state, action) => {
      state.statements = action.payload;
    },
    SearchStatement: (state, action) => {
      state.statementSearch = action.payload;
    },
    SelectStatement: (state: StateType, action) => {
      state.statementContent = action.payload;
    },
    addStatement: (state: StateType, action) => {
      const statement = action.payload;
      state.statements = [...state.statements, statement];
    },
    updateStatement: (state: StateType, action) => {
      const statement = action.payload;
      state.statements = state.statements.map((t) => (t.id === statement.id ? statement : t));
    },
    deleteStatement: (state: StateType, action) => {
      state.statements = state.statements.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatements.pending, (state) => {
        state.statusFetchStatements = 'loading';
      })
      .addCase(fetchStatements.fulfilled, (state, action) => {
        state.statusFetchStatements = 'succeeded';
        state.statements = action.payload;
      })
      .addCase(fetchStatements.rejected, (state, action) => {
        state.statusFetchStatements = 'failed';
        state.errorFetchStatements = action.error.message ?? 'failed to fetch statements';
      })
  }
});

export const { SearchStatement, getStatements, addStatement, updateStatement, deleteStatement, SelectStatement } = FinancialStatementSlice.actions;

export const fetchStatements = createAsyncThunk('financial-statement/fetchStatements', async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.log(err);
    // throw Error(err);
  }
});

export default FinancialStatementSlice.reducer;