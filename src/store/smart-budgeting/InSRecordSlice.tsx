import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'src/store/Store';
import { FetchRequestType, FetchResponseType } from 'src/types/common';
import { InSRecordStatChartDataResponseType, InSRecordType } from 'src/types/smart-budgeting';

const API_URL = '/api/v1/smart-budgeting/income-spending-record';

interface StateType {
    InSRecords: InSRecordType[];
    totalInSRecords: number;
    fetchFilter: FetchRequestType<InSRecordType>;
    fetchStatus: string;
    fetchError: string | undefined;
    fetchStatChartDataStatus: string;
    fetchStatChartDataError: string | undefined;
    fetchStatChartData: InSRecordStatChartDataResponseType | undefined;
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
    fetchStatChartDataStatus: 'idle',
    fetchStatChartDataError: '',
    fetchStatChartData: undefined,
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
            console.log(action.payload);
            state.InSRecords = action.payload.data;
            state.totalInSRecords = action.payload.total;
        });
        builder.addCase(fetchInS.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.fetchError = action.error.message;
        });
        builder
            .addCase(getStatChartData.pending, (state) => {
                state.fetchStatChartDataStatus = 'loading';
            })
            .addCase(getStatChartData.fulfilled, (state, action) => {
                state.fetchStatChartDataStatus = 'succeeded';
                console.log(action.payload)
                state.fetchStatChartData = action.payload;
            })
            .addCase(getStatChartData.rejected, (state, action) => {
                state.fetchStatChartDataStatus = 'failed';
                state.fetchStatChartDataError = action.error.message;
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

export const addInS = createAsyncThunk<
    InSRecordType,
    InSRecordType,
    { dispatch: AppDispatch }
>('InSRecord/addInS', async (InSReq) => {
    const response = await axios.post(`${API_URL}`, InSReq);
    return response.data;
});

export const deleteInS = createAsyncThunk<
    InSRecordType,
    InSRecordType,
    { dispatch: AppDispatch }
>('InSRecord/deleteInS', async (InSReq) => {
    const response = await axios.delete(`${API_URL}/${InSReq.id}`);
    return response.data;
});

export const updateInS = createAsyncThunk<
    InSRecordType,
    InSRecordType,
    { dispatch: AppDispatch }
>('InSRecord/updateInS', async (InSReq) => {
    const response = await axios.put(`${API_URL}/${InSReq.id}`, InSReq);
    return response.data;
});

export const getStatChartData = createAsyncThunk<
    InSRecordStatChartDataResponseType,
    {},
    { dispatch: AppDispatch }
>('InSRecord/statChartData', async () => {
    const response = await axios.get(`${API_URL}/stat-chart`);
    return response.data;
});

export default InSRecordSlice.reducer;
