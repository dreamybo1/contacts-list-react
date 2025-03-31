import { useStore } from "@/shared/store";
import styles from "./style.module.scss";
import { LetterItem } from "@/shared/ui";

function List() {
  const { allLetters } = useStore();
  return <div className={styles.list}>
    {allLetters.map(el => {
        return <LetterItem letter={el}/>
    })}
  </div>;
}

export default List;
