import styles from "./style.module.scss";
import { LetterItem } from "@/shared/ui";
import { useAppSelector } from "@/shared/hooks/hooks";

function List() {
  const { allLetters } = useAppSelector(state => state.letters);
  return <div className={styles.list}>
    {allLetters.map(el => {
        return <LetterItem letter={el}/>
    })}
  </div>;
}

export default List;
