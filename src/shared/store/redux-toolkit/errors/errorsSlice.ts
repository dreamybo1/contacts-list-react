import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
    error: boolean;
    errorValue: string;
}

const initialState: IState = {
    error: false,
    errorValue: ""
}

const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload
        },
        setErrorValue: (state, action: PayloadAction<string>) => {
            state.errorValue = action.payload
        }
    }
})

let errorTimer: NodeJS.Timeout | null = null;

export const toggleError = createAsyncThunk('errors/toggleError', async (_: void, { dispatch }) => {
    dispatch(setError(true));
    if (errorTimer) {
        clearTimeout(errorTimer);
    }
    errorTimer = setTimeout(() => {
        dispatch(setError(false));
        errorTimer = null;
    }, 2000);
});

export const {setError, setErrorValue} = errorsSlice.actions
export const errorsReducer = errorsSlice.reducer;