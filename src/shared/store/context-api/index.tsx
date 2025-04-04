import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ContactsKeys, IContacts, IUser } from "../../types";
import { letters } from "../../consts/letter";



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
  const [users, setUsersState] = useState<IContacts>(
    localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")!) : initialContacts
  );
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

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <StoreContext.Provider
      value={{
        letter,
        allLetters,
        setLetter,
        users,
        allUsers,
        addUser,
        removeUser,
        editUser,
        clearAll,
        searchOpen,
        setEditUserOpen,
        setSearchOpen,
        setUserToChange,
        userToChange,
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
