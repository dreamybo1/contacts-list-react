import { Button, Input } from "@/shared/ui";
import styles from "./style.module.scss";
import { useRef, useState } from "react";
import { IUser } from "@/shared/types";
import { validateInputs } from "@/shared/model";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { editUser, setUserToChange } from "@/shared/store/redux-toolkit/users/usersSlice";
import { setEditUserOpen } from "@/shared/store/redux-toolkit/modals/modalsSlice";
import { setErrorValue, toggleError } from "@/shared/store/redux-toolkit/errors/errorsSlice";

function EditForm() {
  const { userToChange } = useAppSelector(state => state.users);
  const { id, name, vacancy, phone } = userToChange!;
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Omit<IUser, "id">>({
    name: name,
    vacancy: vacancy,
    phone: phone
  });
  const nameref = useRef<HTMLInputElement>(null);
  const vacancyref = useRef<HTMLInputElement>(null);
  const phoneref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    dispatch(toggleError())
  }

  const handleSetErrorValue = (value: string) => {
    dispatch(setErrorValue(value))
  }

  const handleApply = () => {
    if (validateInputs([nameref, vacancyref, phoneref], handleToggle, handleSetErrorValue)) {
      return;
    }
    dispatch(setUserToChange(null));
    dispatch(setEditUserOpen(false));
    if (userToChange) {
      dispatch(editUser({user:userToChange, editedFields:formData}));
      const el: HTMLDivElement = document.querySelector(`[data-id="${id}"]`)!;
      el.classList.add(`${styles.edited}`);
      setTimeout(() => {
        el.classList.remove(`${styles.edited}`);
      }, 200);
    }
  };

  const handleCancel = () => {
    setUserToChange(null);
    setEditUserOpen(false);
  };

  return (
    <form onClick={e => e.stopPropagation()} className={styles.form}>
      <div className={styles.edit_fields}>
        <p className={styles.edit_id}>ID: {id}</p>
        <Input ref={nameref} defaultValue={name} name='name' onChange={handleChange} placeholder='Name' />
        <Input ref={vacancyref} defaultValue={vacancy} name='vacancy' onChange={handleChange} placeholder='Vacancy' />
        <Input ref={phoneref} defaultValue={phone} name='phone' onChange={handleChange} placeholder='Phone' />
      </div>
      <div className={styles.edit_buttons}>
        <Button onClick={handleApply}>Apply</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export default EditForm;
