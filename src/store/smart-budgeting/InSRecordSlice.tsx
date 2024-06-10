import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'src/store/Store';
import { FetchRequestType, FetchResponseType } from 'src/types/common';
import { InSRecordType } from 'src/types/smart-budgeting';

const API_URL = '/api/v1/smart-budgeting/income-spending-record';

interface StateType {
    InSRecords: InSRecordType[];
    totalInSRecords: number;
    fetchFilter: FetchRequestType<InSRecordType>;
    fetchStatus: string;
    fetchError: string | undefined;
}

const initialState: StateType = {
    InSRecords: [],
    totalInSRecords: 0,
    fetchFilter: {
        query: '',
        sortBy: undefined,
        sortOrder: 'asc',
        page: 0,
        rowsPerPage: 5,
    },
    fetchStatus: 'idle',
    fetchError: '',
};

export const InSRecordSlice = createSlice({
    name: 'I_SRecord',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.fetchFilter = {
                ...state.fetchFilter,
                ...action.payload,
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInS.pending, (state) => {
            state.fetchStatus = 'loading';
        });
        builder.addCase(fetchInS.fulfilled, (state, action) => {
            state.fetchStatus = 'succeeded';
            state.InSRecords = action.payload.data;
            state.totalInSRecords = action.payload.total;
        });
        builder.addCase(fetchInS.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.fetchError = action.error.message;
        });
    }
});

export const { setFilter } = InSRecordSlice.actions;

export const fetchInS = createAsyncThunk<
    FetchResponseType<InSRecordType>,
    FetchRequestType<InSRecordType>,
    { dispatch: AppDispatch, state: AppState }
>('InSRecord/fetchInS', async (filter, { dispatch, getState }) => {
    try {
        dispatch(setFilter(filter));
        const response = await axios.get(`${API_URL}`, {
            params: getState().InSRecordRecuder.fetchFilter
        });
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
});

export default InSRecordSlice.reducer;
