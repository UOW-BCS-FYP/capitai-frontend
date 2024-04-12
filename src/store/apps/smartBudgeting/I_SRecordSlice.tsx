import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import type { PayloadAction } from '@reduxjs/toolkit';

const API_URL = '/api/data/sbs/I_SRecord';

interface StateType {
    I_SRecords: any[];
}

const initialState = {
    I_SRecords: []
};

export const I_SRecordSlice = createSlice({
    name: 'I_SRecord',
    initialState,
    reducers: {
        getI_S: (state, action) => {
            state.I_SRecords = action.payload;
        },
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
});

//export const { SearchNotes, getNotes, SelectNote, DeleteNote, UpdateNote, addNote } =
//    ExpectedIncomeSlice.actions;

export const { getI_S } =
    I_SRecordSlice.actions;

export const fetchI_S = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}`);
        dispatch(getI_S(response.data));
    } catch (err: any) {
        throw new Error(err);
    }
};

export default I_SRecordSlice.reducer;
