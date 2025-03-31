import React from "react";
import styles from "./style.module.scss";
import { Input } from "@/shared/ui";
import MainForm from "../MainForm/MainForm";
import Content from "../Content/Content";


function Main() {
  return <main className={styles.main}>
    <MainForm />
    <Content />
  </main>;
}

export default Main;
