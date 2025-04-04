interface IState {
    error: boolean;
    errorValue: string;
}

enum ActionsEnum {
    SET_ERROR = "SET_ERROR",
    SET_ERROR_VALUE = "SET_ERROR_VALUE"
}

interface SetErrorAction {
    type: ActionsEnum.SET_ERROR;
    payload: boolean;
}

interface SetErrorValueAction {
    type: ActionsEnum.SET_ERROR_VALUE;
    payload: string;
}

type Actions = SetErrorAction | SetErrorValueAction;

export const setError = (value: boolean): SetErrorAction => {
    return {
        type: ActionsEnum.SET_ERROR,
        payload: value
    }
}

let errorTimer: NodeJS.Timeout | null = null;
export const toggleError = () => (dispatch: any) => {
    dispatch(setError(true));
    if(errorTimer) {
        clearTimeout(errorTimer);
    }
    errorTimer = setTimeout(() => {
        dispatch(setError(false));
        errorTimer = null;
    }, 2000);
}

export const setErrorValue = (val: string): SetErrorValueAction => {
    return {
        type: ActionsEnum.SET_ERROR_VALUE,
        payload: val
    }
}

const initialState: IState = {
    error: false,
    errorValue: ""
}

export const errorsReducer = (state: IState = initialState, action: Actions) => {
    switch(action.type) {
        case ActionsEnum.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case ActionsEnum.SET_ERROR_VALUE:
            return {
                ...state,
                errorValue: action.payload
            }
        default:
            return state
    }
}