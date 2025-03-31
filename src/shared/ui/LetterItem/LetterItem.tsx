import React, { ComponentProps } from "react";
import styles from "./style.module.scss";
import { ContactsKeys } from "@/shared/types";
import { useStore } from "@/shared/store";

interface IProps {
  className?: string;
  letter: ContactsKeys;
}

function LetterItem(props: IProps) {
  const { className, letter } = props;
  const { users, setLetter, letter: stateLetter } = useStore();

  const handleClick = () => {
    setLetter(letter === stateLetter ? null : letter);
  };
  return (
    <div onClick={handleClick} className={`${className} ${styles.letter_item} ${users[letter].length === 0 && styles.disabled}`}>
      <span className={styles.letter_value}>{letter}</span>
      <span className={styles.count_value}>{users[letter].length > 0 ? users[letter].length : ""}</span>
    </div>
  );
}

export default LetterItem;
