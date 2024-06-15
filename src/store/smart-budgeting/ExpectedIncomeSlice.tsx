import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'src/store/Store';
import { FetchRequestType, FetchResponseType } from 'src/types/common';
import { ExpectedIncomeType } from 'src/types/smart-budgeting';

const API_URL = '/api/v1/smart-budgeting/expected-income';

interface StateType {
    expectedIncomes: ExpectedIncomeType[];
    totalExpectedIncomes: number;
    fetchExpectedIncomeFilter: FetchRequestType<ExpectedIncomeType>;
    fetchExpectedIncomeStatus: string;
    fetchExpectedIncomeError: string | undefined;
}

const initialState: StateType = {
    expectedIncomes: [],
    totalExpectedIncomes: 0,
    fetchExpectedIncomeFilter: {
        query: '',
        sortBy: undefined,
        sortOrder: 'asc',
        page: 0,
        rowsPerPage: 5,
    },
    fetchExpectedIncomeStatus: 'idle',
    fetchExpectedIncomeError: '',
};

export const ExpectedIncomeSlice = createSlice({
    name: 'expectedIncome',
    initialState,
    reducers: {
        setFilter(state, action) {
            state.fetchExpectedIncomeFilter = {
                ...state.fetchExpectedIncomeFilter,
                ...action.payload,
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExpInc.pending, (state) => {
            state.fetchExpectedIncomeStatus = 'loading';
        });
        builder.addCase(fetchExpInc.fulfilled, (state, action) => {
            state.fetchExpectedIncomeStatus = 'succeeded';
            state.expectedIncomes = action.payload.data;
            state.totalExpectedIncomes = action.payload.total;
        });
        builder.addCase(fetchExpInc.rejected, (state, action) => {
            state.fetchExpectedIncomeStatus = 'failed';
            state.fetchExpectedIncomeError = action.error.message;
        });
    }
});

//export const { SearchNotes, getNotes, SelectNote, DeleteNote, UpdateNote, addNote } =
//    ExpectedIncomeSlice.actions;

export const { setFilter } = ExpectedIncomeSlice.actions;

// export const fetchExpInc = () => async (dispatch: AppDispatch) => {
//     try {
//         const response = await axios.get(`${API_URL}`);
//         dispatch(getExpInc(response.data));
//     } catch (err:any) {
//         throw new Error(err);
//     }
// };
export const fetchExpInc = createAsyncThunk<
    FetchResponseType<ExpectedIncomeType>,
    FetchRequestType<ExpectedIncomeType>,
    { dispatch: AppDispatch, state: AppState }
>('expectedIncome/fetchExpInc', async (filter, thunkAPI) => {
    try {
        const { dispatch, getState } = thunkAPI;
        dispatch(setFilter(filter));  // update the filter
        const response = await axios.get(`${API_URL}`, {
            params: getState().expectedIncomeReducer.fetchExpectedIncomeFilter
        });
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
});

export const addExpInc = createAsyncThunk<
    ExpectedIncomeType,
    ExpectedIncomeType,
    { dispatch: AppDispatch }
>('expectedIncome/addExpInc', async (expInc) => {
    const response = await axios.post(`${API_URL}`, expInc);
    return response.data;
});

export const deleteExpInc = createAsyncThunk<
    ExpectedIncomeType,
    ExpectedIncomeType,
    { dispatch: AppDispatch }
>('expectedIncome/deleteExpInc', async (expInc) => {
    const response = await axios.delete(`${API_URL}/${expInc.id}`);
    return response.data;
});

export const updateExpInc = createAsyncThunk<
    ExpectedIncomeType,
    ExpectedIncomeType,
    { dispatch: AppDispatch }
>('expectedIncome/updateExpInc', async (expInc) => {
    const response = await axios.put(`${API_URL}/${expInc.id}`, expInc);
    return response.data;
});

export default ExpectedIncomeSlice.reducer;
