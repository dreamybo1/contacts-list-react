import { Button, Input } from "@/shared/ui";
import styles from "./style.module.scss";
import { useRef, useState } from "react";
import { IUser } from "@/shared/types";
import { validateInputs } from "@/shared/model";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { setErrorValue, toggleError } from "@/shared/store/redux-toolkit/errors/errorsSlice";
import { addUser, clearAll } from "@/shared/store/redux-toolkit/users/usersSlice";
import { setSearchOpen } from "@/shared/store/redux-toolkit/modals/modalsSlice";

function MainForm() {
  const { allUsers } = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IUser>({
    id: 0,
    name: "",
    vacancy: "",
    phone: ""
  });

  const nameref = useRef<HTMLInputElement>(null);
  const vacancyref = useRef<HTMLInputElement>(null);
  const phoneref = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    dispatch(toggleError());
  };

  const handleSetErrorValue = (value: string) => {
    dispatch(setErrorValue(value));
  };

  const handleAdd = () => {
    if (validateInputs([nameref, vacancyref, phoneref], handleToggle, handleSetErrorValue)) {
      return;
    }

    dispatch(
      addUser({
        ...formData,
        id: +new Date()
      })
    );
  };

  const handleSearch = () => {
    if (allUsers.length > 0) {
      dispatch(setSearchOpen(true));
    } else {
      dispatch(setErrorValue("Error: empty contacts list!"));
      dispatch(toggleError());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    dispatch(clearAll());
  };

  return (
    <form onSubmit={e => e.preventDefault()} className={styles.form}>
      <div className={styles.inputs_wrapper}>
        <Input ref={nameref} required name='name' onChange={handleChange} placeholder='Name' />
        <Input ref={vacancyref} required name='vacancy' onChange={handleChange} placeholder='Vacancy' />
        <Input ref={phoneref} required name='phone' onChange={handleChange} placeholder='Phone' />
      </div>
      <div className={styles.buttons_wrapper}>
        <Button onClick={handleAdd}>ADD</Button>
        <Button onClick={handleClear}>CLEAR</Button>
        <Button onClick={handleSearch}>SEARCH</Button>
      </div>
    </form>
  );
}

export default MainForm;
