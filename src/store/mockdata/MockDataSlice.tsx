import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/v1/mock';

interface StateType {
  status: string;
  error: string | undefined;
}

const initialState: StateType = {
  status: 'idle',
  error: ''
};

export const MockDataSlice = createSlice({
  name: 'mockdata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateMockData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateMockData.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(generateMockData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? '';
      })
      .addCase(deleteMockData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMockData.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteMockData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? '';
      });
  }
});

export const generateMockData = createAsyncThunk('mockdata/generateMockData', async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.post(`${API_URL}/all-data`);
    return response.data;
  } catch (err) {
    console.log(err);
    // throw Error(err);
  }
});

export const deleteMockData = createAsyncThunk('mockdata/deleteMockData', async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.delete(`${API_URL}/all-data`);
    return response.data;
  } catch (err) {
    console.log(err);
    // throw Error(err);
  }
});

export default MockDataSlice.reducer;
