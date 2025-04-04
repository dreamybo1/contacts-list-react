import { initialContacts } from "@/shared/consts/initialUsers";
import { ContactsKeys, IContacts, IUser } from "@/shared/types";

interface IState {
  users: IContacts;
  allUsers: IUser[];
  userToChange: IUser | null;
}

const initialState: IState = {
  users: localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")!) : initialContacts,
  allUsers: [],
  userToChange: null
};

enum ActionsEnum {
  ADD_USER = "ADD_USER",
  REMOVE_USER = "REMOVE_USER",
  EDIT_USER = "EDIT_USER",
  CLEAR_ALL = "CLEAR_ALL",
  SET_USER_TO_CHANGE = "SET_USER_TO_CHANGE"
}

interface AddUserAction {
  type: ActionsEnum.ADD_USER;
  payload: IUser;
}
interface RemoveUserAction {
  type: ActionsEnum.REMOVE_USER;
  payload: IUser;
}

interface EditUserPayload {
  user: IUser;
  editedFields: Omit<IUser, "id">;
}

interface EditUserAction {
  type: ActionsEnum.EDIT_USER;
  payload: EditUserPayload;
}

interface ClearAllAction {
  type: ActionsEnum.CLEAR_ALL;
}

interface SetUserToChangeAction {
  type: ActionsEnum.SET_USER_TO_CHANGE;
  payload: IUser | null;
}

type Actions = AddUserAction | RemoveUserAction | EditUserAction | ClearAllAction | SetUserToChangeAction;

export const addUser = (user: IUser): AddUserAction => {
  return {
    type: ActionsEnum.ADD_USER,
    payload: user
  };
};

export const removeUser = (user: IUser): RemoveUserAction => {
  return {
    type: ActionsEnum.REMOVE_USER,
    payload: user
  };
};

export const editUser = <T extends IUser, K extends Omit<IUser, "id">>(user: T, editedFields: K): EditUserAction => {
  return {
    type: ActionsEnum.EDIT_USER,
    payload: { user, editedFields }
  };
};

export const clearAll = (): ClearAllAction => {
  return {
    type: ActionsEnum.CLEAR_ALL
  };
};

export const setUserToChange = (user: IUser | null): SetUserToChangeAction => {
  return {
    type: ActionsEnum.SET_USER_TO_CHANGE,
    payload: user
  };
};

export const usersReducer = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionsEnum.ADD_USER: {
      const firstLetter = action.payload.name[0]?.toUpperCase() as ContactsKeys;
      const updatedUsers = state.users[firstLetter]?.length > 0
        ? { ...state.users, [firstLetter]: [...state.users[firstLetter], action.payload] }
        : { ...state.users, [firstLetter]: [action.payload] };
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return {
        ...state,
        users: updatedUsers,
        allUsers: Object.values(updatedUsers).flat()
      };
    }
    case ActionsEnum.REMOVE_USER: {
      const firstLetter = action.payload.name[0]?.toUpperCase() as ContactsKeys;
      const updatedUsers = {
        ...state.users,
        [firstLetter]: state.users[firstLetter].filter(el => el.id !== action.payload.id)
      };
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return {
        ...state,
        users: updatedUsers,
        allUsers: Object.values(updatedUsers).flat()
      };
    }
    case ActionsEnum.EDIT_USER: {
      const firstLetterOld = action.payload.user.name[0]?.toUpperCase() as ContactsKeys;
      const firstLetterNew = action.payload.editedFields.name[0]?.toUpperCase() as ContactsKeys;
      let updatedUsers: IContacts;
      if (firstLetterNew !== firstLetterOld) {
        updatedUsers = {
          ...state.users,
          [firstLetterOld]: state.users[firstLetterOld].filter(el => el.id !== action.payload.user.id),
          [firstLetterNew]: [
            ...state.users[firstLetterNew],
            { ...action.payload.user, ...action.payload.editedFields }
          ]
        };
      } else {
        const list = state.users[firstLetterOld];
        const userIndex = list.findIndex(el => el.id === action.payload.user.id);
        const updatedList = [...list];
        updatedList[userIndex] = { ...updatedList[userIndex], ...action.payload.editedFields } as IUser;
        updatedUsers = { ...state.users, [firstLetterOld]: updatedList };
      }
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return {
        ...state,
        users: updatedUsers,
        allUsers: Object.values(updatedUsers).flat()
      };
    }
    case ActionsEnum.CLEAR_ALL: {
      localStorage.setItem("users", JSON.stringify(initialContacts));
      return {
        ...state,
        users: initialContacts,
        allUsers: Object.values(initialContacts).flat()
      };
    }
    case ActionsEnum.SET_USER_TO_CHANGE:
      return { ...state, userToChange: action.payload };
    default:
      return state;
  }
};
