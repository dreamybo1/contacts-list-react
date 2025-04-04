import { letters } from "@/shared/consts/letter";
import { ContactsKeys } from "@/shared/types";

type ChoosenLetter = ContactsKeys | null;

enum ActionsEnum {
    SET_LETTER = "SET_LETTER",
}

interface IState {
    letter: ChoosenLetter
    allLetters: ContactsKeys[]
}

interface SetLetterAction {
    type: "SET_LETTER"
    payload: ChoosenLetter
}

type Actions = SetLetterAction;


const initialLState: IState = {
    letter: null,
    allLetters: letters
}

export const lettersReducer = (state: IState = initialLState, action: Actions) => {
    switch (action.type) {
        case ActionsEnum.SET_LETTER:
            return {...state, letter: action.payload}
        default:
            return state
    }
}

export const setLetter = (letter: ChoosenLetter): SetLetterAction => {
    return {
        type: ActionsEnum.SET_LETTER,
        payload: letter
    }
}

