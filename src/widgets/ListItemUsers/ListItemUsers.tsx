import { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { useStore } from "@/shared/store";
import UserItem from "../UserItem/UserItem";

function ListItemUsers() {
  const { letter, users } = useStore();
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
