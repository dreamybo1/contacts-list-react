import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
    searchOpen: boolean;
    editUserOpen: boolean;
}

const initialState: IState = {
    searchOpen: false,
    editUserOpen: false,
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setSearchOpen: (state, action: PayloadAction<boolean>) => {
            state.searchOpen = action.payload;
        },
        setEditUserOpen: (state, action: PayloadAction<boolean>) => {
            state.editUserOpen = action.payload;
        },
    }
})

export const {setEditUserOpen, setSearchOpen} = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer;