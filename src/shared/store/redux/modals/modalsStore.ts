interface IState {
    searchOpen: boolean;
    editUserOpen: boolean;
}

enum ActionsEnum {
    SET_SEARCH_OPEN = "SET_SEARCH_OPEN",
    SET_EDIT_USER_OPEN = "SET_EDIT_USER_OPEN",
}

interface SetSearchOpenAction {
    type: ActionsEnum.SET_SEARCH_OPEN;
    payload: boolean;
}
interface SetEditUserOpenAction {
    type: ActionsEnum.SET_EDIT_USER_OPEN;
    payload: boolean;
}
type Actions = SetSearchOpenAction | SetEditUserOpenAction;

export const setSearchOpen = (open: boolean): SetSearchOpenAction => {
    return {
        type: ActionsEnum.SET_SEARCH_OPEN,
        payload: open,
    };
}
export const setEditUserOpen = (open: boolean): SetEditUserOpenAction => {
    return {
        type: ActionsEnum.SET_EDIT_USER_OPEN,
        payload: open,
    };
}
const initialState: IState = {
    searchOpen: false,
    editUserOpen: false,
}
export const modalsReducer = (state: IState = initialState, action: Actions) => {
    switch (action.type) {
        case ActionsEnum.SET_SEARCH_OPEN:
            return { ...state, searchOpen: action.payload };
        case ActionsEnum.SET_EDIT_USER_OPEN:
            return { ...state, editUserOpen: action.payload };
        default:
            return state;
    }
}