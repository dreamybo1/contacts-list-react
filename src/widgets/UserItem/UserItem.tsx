import { IUser } from "@/shared/types";
import styles from "./style.module.scss";
import { useStore } from "@/shared/store";

interface IProps {
  user: IUser;
}

function UserItem({ user }: IProps) {
  const { id, name, vacancy, phone } = user;
  const { removeUser, setEditUserOpen, setUserToChange } = useStore();
  const handleRemove = () => removeUser(user);
  const handleEdit = () => {
    setUserToChange(user);
    setEditUserOpen(true);
  };

  return (
    <div data-id={id} className={styles.user_item}>
      <div className={styles.buttons_div}>
        <button onClick={handleEdit}>
          <img src='assets/edit.svg' alt='' />
        </button>
        <button onClick={handleRemove}>
          <img src='assets/delete.svg' alt='' />
        </button>
      </div>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Vacancy: {vacancy}</p>
      <p>Phone: {phone}</p>
    </div>
  );
}

export default UserItem;
