import styles from "./style.module.scss";
import { ChangeEvent, useState } from "react";
import UserItem from "../UserItem/UserItem";
import { useAppSelector } from "@/shared/hooks/hooks";

function Search() {
  const { allUsers } = useAppSelector(state => state.users);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div onClick={e => e.stopPropagation()} className={styles.search}>
      <input onChange={handleChange} placeholder='Search' />
      <div className={styles.search_result}>
        {allUsers.filter(el => {
          return el.name.toLowerCase().includes(searchValue.toLowerCase())
        }).map(el => <UserItem user={el} />)}
      </div>
    </div>
  );
}

export default Search;
