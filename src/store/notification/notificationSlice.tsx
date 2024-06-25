import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'src/store/Store';
import { FetchRequestType, FetchResponseType } from 'src/types/common';
import { notificationType } from 'src/types/notification';

const API_URL = '/api/v1/notif';

interface StateType {
  notifications: notificationType[];
  totalNotifications: number;
  fetchNotificationStatus: string;
  fetchNotificationError: string | undefined;
  fetchFilter: FetchRequestType<notificationType>;
}

const initialState: StateType = {
  notifications: [],
  totalNotifications: 0,
  fetchNotificationStatus: 'idle',
  fetchNotificationError: '',
  fetchFilter: {
    query: '',
    sortBy: undefined,
    sortOrder: 'asc',
    page: 0,
    rowsPerPage: 5,
},
};

export const NotificationSlice = createSlice({
  name: 'notification',
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
      builder.addCase(fetchNotification.pending, (state) => {
          state.fetchNotificationStatus = 'loading';
      });
      builder.addCase(fetchNotification.fulfilled, (state, action) => {
          state.fetchNotificationStatus = 'succeeded';
          state.notifications = action.payload.data;
          state.totalNotifications = action.payload.total;
      });
      builder.addCase(fetchNotification.rejected, (state, action) => {
          state.fetchNotificationStatus = 'failed';
          state.fetchNotificationError = action.error.message;
      });
  }
});

export const { setFilter } = NotificationSlice.actions;

export const fetchNotification = createAsyncThunk('notification/fetchNotification', async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
});

export const deleteNotification = createAsyncThunk<
    notificationType,
    notificationType,
    { dispatch: AppDispatch }
>('notification/deleteNotification', async (notif) => {
    const response = await axios.delete(`${API_URL}/${notif.id}`);
    return response.data;
});

export default NotificationSlice.reducer;
