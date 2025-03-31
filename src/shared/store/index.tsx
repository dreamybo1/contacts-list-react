import { createContext, ReactNode, use, useContext, useEffect, useRef, useState } from "react";
import { ContactsKeys, IContacts, IUser } from "../types";

const letters: ContactsKeys[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

const initialContacts: IContacts = letters.reduce((acc, curr) => {
  acc[curr] = [];
  return acc;
}, {} as IContacts);

type ProviderLetter = ContactsKeys | null;

interface IProviderProps {
  letter: ProviderLetter;
  allLetters: ContactsKeys[];
  users: IContacts;
  allUsers: IUser[];
  setLetter: (letter: ProviderLetter) => void;
  addUser: (user: IUser) => void;
  removeUser: (user: IUser) => void;
  editUser: <T extends IUser, K extends Omit<IUser, "id">>(user: T, editedFields: K) => void;
  clearAll: () => void;
  searchOpen: boolean;
  editUserOpen: boolean;
  userToChange: IUser | null;
  setSearchOpen: (open: boolean) => void;
  setEditUserOpen: (open: boolean) => void;
  setUserToChange: (user: IUser | null) => void;
  error: boolean;
  toggleError: () => void;
  errorValue: string;
  setErrorValue: (value: string) => void;
}

const StoreContext = createContext<IProviderProps | undefined>(undefined);

interface IProvider {
  children: ReactNode;
}

function StoreProvider({ children }: IProvider) {
  const [letter, setLetterState] = useState<ProviderLetter>(null);
  const [users, setUsersState] = useState<IContacts>(initialContacts);
  const [searchOpen, setSearchOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [userToChange, setUserToChange] = useState<IUser | null>(null);
  const [error, setError] = useState(false);
  const [errorValue, setErrorValue] = useState("");

  const toggleError = () => {
    setError(true);
  };

  const allLetters = useRef(letters).current;

  const allUsers = Object.values(users).reduce((acc, curr) => {
    return [...acc, ...curr];
  }, []);

  const setLetter = (letter: ProviderLetter) => {
    setLetterState(letter);
  };

  const addUser = (user: IUser) => {
    let firstLetter = user.name[0]?.toUpperCase() as ContactsKeys;
    console.log(users, firstLetter);

    setUsersState(
      users[firstLetter]?.length > 0
        ? {
            ...users,
            [firstLetter]: [...users[firstLetter], user]
          }
        : { ...users, [firstLetter]: [user] }
    );
  };

  const removeUser = (user: IUser) => {
    let firstLetter = user.name[0]?.toUpperCase() as ContactsKeys;
    setUsersState({
      ...users,
      [firstLetter]: users[firstLetter].filter(el => el.id !== user.id)
    });
  };

  const editUser = <T extends IUser, K extends Omit<IUser, "id">>(user: T, editedFields: K) => {
    let firstLetter = user.name[0]?.toUpperCase() as ContactsKeys;
    let firstLetterOfNewName = editedFields.name[0]?.toUpperCase() as ContactsKeys;
    if (firstLetterOfNewName !== firstLetter) {
      setUsersState({
        ...users,
        [firstLetter]: users[firstLetter].filter(el => el.id !== user.id),
        [firstLetterOfNewName]: [...users[firstLetterOfNewName], { ...user, ...editedFields }]
      });
      return;
    }
    let userIndex = users[firstLetter]?.findIndex(el => el.id === user.id);
    console.log("INDEX", userIndex, "ARRAY", users[firstLetter], "LETTER", firstLetter, "USERTOCHANGE", user);
    let newArr = [...users[firstLetter]];

    newArr[userIndex] = { ...newArr[userIndex], ...editedFields } as IUser;
    setUsersState({
      ...users,
      [firstLetter]: newArr
    });
  };

  const clearAll = () => {
    setUsersState(initialContacts);
    setLetter(null);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setError(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <StoreContext.Provider
      value={{
        letter,
        allLetters,
        users,
        setLetter,
        addUser,
        removeUser,
        editUser,
        clearAll,
        allUsers,
        searchOpen,
        setEditUserOpen,
        setSearchOpen,
        userToChange,
        setUserToChange,
        editUserOpen,
        error,
        errorValue,
        setErrorValue,
        toggleError
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export default StoreProvider;
