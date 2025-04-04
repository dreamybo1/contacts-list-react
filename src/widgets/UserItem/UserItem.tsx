import { IUser } from "@/shared/types";
import styles from "./style.module.scss";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { removeUser, setUserToChange } from "@/shared/store/redux-toolkit/users/usersSlice";
import { setEditUserOpen } from "@/shared/store/redux-toolkit/modals/modalsSlice";

interface IProps {
  user: IUser;
}

function UserItem({ user }: IProps) {
  const dispatch = useAppDispatch()
  const { id, name, vacancy, phone } = user;


  const handleRemove = () => dispatch(removeUser(user));
  const handleEdit = () => {
    dispatch(setUserToChange(user));
    dispatch(setEditUserOpen(true));
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
