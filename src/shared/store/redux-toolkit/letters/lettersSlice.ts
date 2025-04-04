import { letters } from "@/shared/consts/letter";
import { ContactsKeys } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
    letter: ContactsKeys | null;
    allLetters: ContactsKeys[];
}

const initialState: IState = {
    letter: null,
    allLetters: letters
}

const lettersSlice = createSlice({
    name: "letters",
    initialState,
    reducers: {
        setLetter: (state, action: PayloadAction<ContactsKeys | null>) => {
            state.letter = action.payload;
        }
    }
})


export const { setLetter } = lettersSlice.actions;
export const lettersReducer = lettersSlice.reducer;