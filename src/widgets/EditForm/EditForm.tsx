import { Button, Input } from "@/shared/ui";
import styles from "./style.module.scss";
import { useRef, useState } from "react";
import { IUser } from "@/shared/types";
import { useStore } from "@/shared/store";
import { validateInputs } from "@/shared/model";

function EditForm() {
  const { userToChange, editUser, setUserToChange, setEditUserOpen, toggleError, setErrorValue } = useStore();
  const { id, name, vacancy, phone } = userToChange!;

  const [formData, setFormData] = useState<Omit<IUser, "id">>({
    name: name,
    vacancy: vacancy,
    phone: phone
  });
  const nameref = useRef<HTMLInputElement>(null);
  const vacancyref = useRef<HTMLInputElement>(null);
  const phoneref = useRef<HTMLInputElement>(null);
  console.log(formData, "FORMA");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    if (validateInputs([nameref, vacancyref, phoneref], toggleError, setErrorValue)) {
      return;
    }
    setUserToChange(null);
    setEditUserOpen(false);
    if (userToChange) {
      editUser(userToChange, formData);
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
