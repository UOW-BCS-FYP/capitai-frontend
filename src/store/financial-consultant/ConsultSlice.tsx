import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'src/store/Store';
import { uniqueId } from 'lodash';
// import { sub } from 'date-fns';
import { ConsultantAttachement, ConsultantMessage, FetchFinancialConsultantRequestType, FetchFinancialConsultantResponseType, FinancialConsultant, SocketChatType } from 'src/types/financial-consultant';
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
  agentStatus: 'idle'
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
    sendMsg: (state: StateType, action: { payload: { consultant_id: string | number, msg: string, message_id: string }}) => {
      const conversation = action.payload;
      const { consultant_id, msg, message_id } = conversation;

      // create a new user message
      const newMessage: ConsultantMessage = {
        id: message_id,
        msg: msg,
        type: 'text',
        attachments: Array<ConsultantAttachement>(),
        createdAt: new Date().getTime(),
        senderId: uniqueId(),
      };

      // create a new consultant message
      const replyMessage: ConsultantMessage = {
        id: `${message_id}-r`,
        msg: '',      // dummy message
        type: 'text', // must be 'text'
        attachments: Array<ConsultantAttachement>(),
        createdAt: new Date().getTime(),
        senderId: consultant_id,
      }

      // put user message in the chat
      state.consultants = state.consultants.map((consultant) => {
        if (consultant.id === consultant_id) {
          consultant.messages.push(newMessage);
          consultant.messages.push(replyMessage);
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
    setConsultantNewToken(state, action: { payload: { token: string, consultant_id: string | number, message_id: string }}) {
      // state.agentNewToken += action.payload;
      state.consultants = state.consultants.map((consultant) => {
        if (consultant.id === action.payload.consultant_id) {
          consultant.messages = consultant.messages.map((message) => {
            if (message.id === action.payload.message_id) {
              // message.attachments = [{ type: 'token', token: action.payload.token }];
              message.msg += `${action.payload.token}`;
            }
            return message;
          });
        }
        return consultant;
      });
    },
    setConsultantOutput(state, action: { payload: { consultant_id: string | number, message_id: string, output: string, intermediate_steps: Array<string> }}) {
      state.consultants = state.consultants.map((consultant) => {
        if (consultant.id === action.payload.consultant_id) {
          consultant.messages = consultant.messages.map((message) => {
            if (message.id === action.payload.message_id) {
              message.msg = `${action.payload.output}`;
            }
            return message;
          });
        }
        return consultant;
      });
    },
    setConsultantChat(state, action: { payload: SocketChatType }) {
      const { agent_id, message_id } = action.payload;
      const { chain_start, llm_new_token } = action.payload;
      if (chain_start) {
        state.consultants = state.consultants.map((consultant) => {
          if (consultant.id === agent_id) {
            consultant.messages = consultant.messages.map((message) => {
              if (message.id === message_id) {
                message.msg = llm_new_token;
                message.llm = action.payload;
              }
              return message;
            });
          }
          return consultant;
        });
      }
    }
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

export const { selectConsultant, setFilter, sendMsg, setAgentStatus, setConsultantNewToken, setConsultantOutput, setConsultantChat } = ConsultantSlice.actions;

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
