import { Button, Input } from "@/shared/ui";
import styles from "./style.module.scss";
import { useStore } from "@/shared/store";
import { useEffect, useRef, useState } from "react";
import { IUser } from "@/shared/types";
import { regulars, validateInputs } from "@/shared/model";

function MainForm() {
  const {addUser, clearAll, setSearchOpen, allUsers, setErrorValue, toggleError} = useStore()

  const [formData, setFormData] = useState<IUser>({
    id: 0,
    name: "",
    vacancy: "",
    phone: ""
  });

  const nameref = useRef<HTMLInputElement>(null)
  const vacancyref = useRef<HTMLInputElement>(null)
  const phoneref = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    // const {name, } = formRef.current?.dataset
    console.log(formData);
    
    if (validateInputs([nameref, vacancyref, phoneref], toggleError, setErrorValue)) {
      return
    }

    addUser({
      ...formData,
      id: +new Date(),
    })
  }

  const handleSearch = () => {
    if (allUsers.length > 0) {
      setSearchOpen(true)
    } else {
      setErrorValue('Error: empty contacts list!')
      toggleError()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    clearAll()
  }

  return (
    <form onSubmit={e => e.preventDefault()} className={styles.form}>
      <div className={styles.inputs_wrapper}>
        <Input ref={nameref} required name="name" onChange={handleChange} placeholder="Name"/>
        <Input ref={vacancyref} required name="vacancy" onChange={handleChange} placeholder="Vacancy"/>
        <Input ref={phoneref} required name="phone" onChange={handleChange} placeholder="Phone"/>
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
