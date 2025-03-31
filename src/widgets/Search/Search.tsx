import { useStore } from "@/shared/store";
import styles from "./style.module.scss";
import { ChangeEvent, useState } from "react";
import UserItem from "../UserItem/UserItem";

function Search() {
  const { allUsers } = useStore();
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
