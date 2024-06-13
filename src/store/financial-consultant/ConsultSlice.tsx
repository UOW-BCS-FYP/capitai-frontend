import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'src/store/Store';
import { uniqueId } from 'lodash';
import { sub } from 'date-fns';
import { ConsultantAttachement, ConsultantMessage, FetchFinancialConsultantRequestType, FetchFinancialConsultantResponseType, FinancialConsultant } from 'src/types/financial-consultant';
// import useAuth from 'src/guards/authGuard/UseAuth';
// import { useContext } from 'react';
// import AuthContext from 'src/guards/firebase/FirebaseContext';

const API_URL = '/api/v1/financial-consultant';

interface StateType {
  // chats: any[];
  // chatContent: number;
  // chatSearch: string;
  // ws: any;
  total: number;
  consultants: FinancialConsultant[];
  chattingWith: number | string | undefined;
  fetchConsultantStatus: string;
  fetchConsultantError: string | undefined;
  fetchConsultantFilter: FetchFinancialConsultantRequestType;
  agentNewToken: string;
  agentStatus: 'idle' | 'loading' | 'succeeded' | 'failed' | 'completed';
}

const initialState: StateType = {
  // chats: [],
  // chatContent: 1,
  // chatSearch: '',
  // ws: io('http://localhost:5001'),
  total: 0,
  consultants: Array<FinancialConsultant>(),
  chattingWith: undefined,
  fetchConsultantStatus: 'idle',
  fetchConsultantError: '',
  fetchConsultantFilter: {
    query: '',
    sortBy: undefined,
    sortOrder: 'asc',
    page: 0,
    rowsPerPage: 10,
  },
  agentNewToken: '',
  agentStatus: 'idle',
};

export const ConsultantSlice = createSlice({
  name: 'financial-consultant',
  initialState,
  reducers: {
    // getChats: (state, action) => {
    //   state.chats = action.payload;
    // },
    // SearchChat: (state, action) => {
    //   state.chatSearch = action.payload;
    // },
    selectConsultant: (state: StateType, action: { payload: number | string }) => {
      state.chattingWith = action.payload;
    },
    sendMsg: (state: StateType, action) => {
      const conversation = action.payload;
      const { id, msg } = conversation;

      const newMessage: ConsultantMessage = {
        id: id,
        msg: msg,
        type: 'text',
        attachments: Array<ConsultantAttachement>(),
        createdAt: new Date().getTime(),
        senderId: uniqueId(),
      };

      state.consultants = state.consultants.map((consultant) => {
        if (consultant.id === action.payload.id) {
          consultant.messages.push(newMessage);
        }
        return consultant;
      });
    },
    setFilter(state, action: { payload: Partial<FetchFinancialConsultantRequestType> }) {
      state.fetchConsultantFilter = {
        ...state.fetchConsultantFilter,
        ...action.payload
      }
    },
    setAgentStatus(state, action: { payload: 'idle' | 'loading' | 'succeeded' | 'failed' | 'completed' }) {
      state.agentStatus = action.payload;
    },
    setAgentNewToken(state, action: { payload: string }) {
      state.agentNewToken += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultant.pending, (state) => {
        state.fetchConsultantStatus = 'loading';
      })
      .addCase(fetchConsultant.fulfilled, (state, action) => {
        state.fetchConsultantStatus = 'succeeded';
        state.consultants = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchConsultant.rejected, (state, action) => {
        state.fetchConsultantStatus = 'failed';
        state.fetchConsultantError = action.error.message ?? 'failed to fetch consultant';
      })
  }
});


export const fetchConsultant = createAsyncThunk<
  FetchFinancialConsultantResponseType,
  FetchFinancialConsultantRequestType,
  {
    state: AppState,
    dispatch: AppDispatch
  }
>('financial-consultant/fetchConsultant', async (filter, thunkAPI) => {
  try {
    const { dispatch, getState } = thunkAPI;
    dispatch(setFilter(filter));  // update the filter
    const { fetchConsultantFilter } = getState().financialConsultantReducer;  // get the updated filter
    const response = await axios.get(`${API_URL}/consultant-chat`, {
      params: {
        query: fetchConsultantFilter.query,
        sortBy: fetchConsultantFilter.sortBy,
        sortOrder: fetchConsultantFilter.sortOrder,
        page: fetchConsultantFilter.page,
        rowsPerPage: fetchConsultantFilter.rowsPerPage
      }
    });
    return response.data;
  } catch (err) {
    throw new Error();
  }
})

export const { selectConsultant, setFilter, sendMsg, setAgentStatus, setAgentNewToken } = ConsultantSlice.actions;

// auth.socket?.on('server_response', (response: any) => {
//   console.log('server_response', response);
//   // let replyMessage: ConsultantMessage = {
//   //   id: response.id,
//   //   msg: response.msg,
//   //   type: 'text',
//   //   attachments: response.attachment,
//   //   createdAt: sub(new Date(), { seconds: 1 }),
//   //   senderId: response.id,
//   // }

//   // update the chat with the response asynchrounously
//   // ConsultantSlice.reducer(undefined, sendMsg({ id: response.id, msg: response.msg }));
// })

// export const fetchChats = () => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.get(`${API_URL}`);
//     // dispatch(getChats(response.data));
//   } catch (err: any) {
//     throw new Error(err);
//   }
// };

export default ConsultantSlice.reducer;
