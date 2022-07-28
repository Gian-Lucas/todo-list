import "./global.scss";
import styles from "./App.module.scss";

import logo from "./assets/logo.svg";
import clipboard from "./assets/clipboard.svg";
import { PlusCircle } from "phosphor-react";

export function App() {
  return (
    <div className={styles.container}>
      <header>
        <img src={logo} alt="Logo" />
        <h1>
          to<span>do</span>
        </h1>
      </header>

      <form>
        <input type="text" />
        <button type="submit">
          Criar <PlusCircle size={16} />
        </button>
      </form>

      <div>
        <header>
          <div>
            <span>Tarefas criadas</span>
            <span>0</span>
          </div>
          <div>
            <span>Concluídas</span>
            <span>0</span>
          </div>
        </header>
        <main>
          <img src={clipboard} alt="Clipboard" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </main>
      </div>
    </div>
  );
}
