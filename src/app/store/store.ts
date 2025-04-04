
import { errorsReducer } from "@/shared/store/redux-toolkit/errors/errorsSlice"
import { lettersReducer } from "@/shared/store/redux-toolkit/letters/lettersSlice"
import { modalsReducer } from "@/shared/store/redux-toolkit/modals/modalsSlice"
import { usersReducer } from "@/shared/store/redux-toolkit/users/usersSlice"
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"



const rootReducer = combineReducers({
    errors: errorsReducer,
    modals: modalsReducer,
    users: usersReducer,
    letters: lettersReducer,
})

export const store = configureStore({reducer: rootReducer})

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof rootReducer>