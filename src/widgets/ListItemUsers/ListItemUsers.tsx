import { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import UserItem from "../UserItem/UserItem";
import { useAppSelector } from "@/shared/hooks/hooks";

function ListItemUsers() {
  const { letter } = useAppSelector(state => state.letters);
  const { users } = useAppSelector(state => state.users);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ behavior: "smooth", top: 0 });
  }, [letter]);

  return (
    <div ref={listRef} className={`${styles.list_item_users} ${letter && users[letter].length > 0 ? styles.list_item_users_opened : ""}`}>
      {letter && users[letter].map(user => {
        return <UserItem user={user} />
      })}
    </div>
  );
}

export default ListItemUsers;
