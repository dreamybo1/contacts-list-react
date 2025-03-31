import styles from './style.module.scss'
import List from "../List/List";
import ListItemUsers from "../ListItemUsers/ListItemUsers";

function Content() {
  return <div className={styles.content}>
    <List />
    <ListItemUsers />
  </div>;
}

export default Content;
