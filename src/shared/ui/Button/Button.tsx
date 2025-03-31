import { ComponentProps, ReactNode } from "react";
import styles from "./style.module.scss";

interface IProps extends ComponentProps<"button"> {
  className?: string;
  children?: ReactNode
}

function Button(props: IProps) {
  const { className, children, ...rest } = props;
  return <button type="button" className={`${className} ${styles.button}`} {...rest}>
    {children}
  </button>
}

export default Button;
