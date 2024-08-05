import Board from "../Robot/Board/Board";
import styles from "./App.module.scss";
import "../i18n";

function App() {
  return (
    <div className={styles.appContainer}>
      <Board />
    </div>
  );
}

export default App;
