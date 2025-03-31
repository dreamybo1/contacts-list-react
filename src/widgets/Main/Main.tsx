import styles from "./style.module.scss";
import MainForm from "../MainForm/MainForm";
import Content from "../Content/Content";


function Main() {
  return <main className={styles.main}>
    <MainForm />
    <Content />
  </main>;
}

export default Main;
