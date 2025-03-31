import React, { ComponentProps } from "react";
import styles from "./style.module.scss";

interface IProps extends ComponentProps<"input"> {
  className?: string;
}

function Input(props: IProps) {
  const { className, ...rest } = props;
  const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.style = ""
  };
  return <input onInput={handleOnInput} className={`${className} ${styles.input}`} {...rest} />
}

export default Input;
