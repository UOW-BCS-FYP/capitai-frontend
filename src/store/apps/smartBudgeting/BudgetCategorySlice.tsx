import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import type { PayloadAction } from '@reduxjs/toolkit';

const API_URL = '/api/data/sbs/BudgetCategory';

interface StateType {
    budgetCategories: any[];
}

const initialState = {
    budgetCategories: []
};

export const BudgetCategorySlice = createSlice({
    name: 'budgetCategory',
    initialState,
    reducers: {
        getBudgetCtgy: (state, action) => {
            state.budgetCategories = action.payload;
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

export const { getBudgetCtgy } =
    BudgetCategorySlice.actions;

export const fetchBudgetCtgy = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}`);
        dispatch(getBudgetCtgy(response.data));
    } catch (err: any) {
        throw new Error(err);
    }
};

export default BudgetCategorySlice.reducer;
