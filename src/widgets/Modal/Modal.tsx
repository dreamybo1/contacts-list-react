import { ReactNode } from "react";

import styles from "./style.module.scss";
import { createPortal } from "react-dom";

interface IProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string
}

function Modal({ open, onClose, children,className }: IProps) {
  return open ? createPortal(<div onClick={onClose} className={`${styles.modal} ${className || ""}`}>{children}</div>, document.body) : null;
}

export default Modal;
