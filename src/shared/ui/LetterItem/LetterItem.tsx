import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import styles from "./style.module.scss";
import { ContactsKeys } from "@/shared/types";
import { setLetter } from "@/shared/store/redux-toolkit/letters/lettersSlice";

interface IProps {
  className?: string;
  letter: ContactsKeys;
}

function LetterItem(props: IProps) {
  const { className, letter } = props;
  const {letter: stateLetter } = useAppSelector(state => state.letters);
  const { users } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(setLetter(letter === stateLetter ? null : letter));
  };
  return (
    <div onClick={handleClick} className={`${className} ${styles.letter_item} ${users[letter].length === 0 && styles.disabled}`}>
      <span className={styles.letter_value}>{letter}</span>
      <span className={styles.count_value}>{users[letter].length > 0 ? users[letter].length : ""}</span>
    </div>
  );
}

export default LetterItem;
