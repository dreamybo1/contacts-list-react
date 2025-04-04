import { initialContacts } from "@/shared/consts/initialUsers";
import { ContactsKeys, IContacts, IUser } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface EditUserPayload {
  user: IUser;
  editedFields: Omit<IUser, "id">;
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      const firstLetter = action.payload.name[0]?.toUpperCase() as ContactsKeys;
      const updatedUsers = state.users[firstLetter]?.length > 0
        ? { ...state.users, [firstLetter]: [...state.users[firstLetter], action.payload] }
        : { ...state.users, [firstLetter]: [action.payload] };
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      state.users = updatedUsers;
      state.allUsers = Object.values(updatedUsers).flat();
    },
    removeUser: (state, action: PayloadAction<IUser>) => {
      const firstLetter = action.payload.name[0]?.toUpperCase() as ContactsKeys;
      const updatedUsers = {
        ...state.users,
        [firstLetter]: state.users[firstLetter].filter(el => el.id !== action.payload.id)
      };
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      state.users = updatedUsers;
      state.allUsers = Object.values(updatedUsers).flat();
    },
    editUser: (state, action: PayloadAction<EditUserPayload>) => {
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
      state.users = updatedUsers;
      state.allUsers = Object.values(updatedUsers).flat();
    },
    clearAll: (state) =>
      {
        localStorage.setItem("users", JSON.stringify(initialContacts));
        state.users = initialContacts;
        state.allUsers = Object.values(initialContacts).flat();
      },
    setUserToChange: (state, action: PayloadAction<IUser | null>) => {
      state.userToChange = action.payload;
    }
  }
})

export const { addUser, removeUser, editUser, clearAll, setUserToChange } = usersSlice.actions
export const usersReducer = usersSlice.reducer;