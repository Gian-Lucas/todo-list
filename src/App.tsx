import "./global.scss";
import styles from "./App.module.scss";

import clipboard from "./assets/clipboard.svg";
import { PlusCircle } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Task } from "./components/Task/Task";
import { HeaderTasksInfo } from "./components/HeaderTasksInfo/HeaderTasksInfo";

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

export function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => {
    
    const tasksStored = localStorage.getItem("@todo-list:tasks-1.0.0")

    if (tasksStored) {
      return JSON.parse(tasksStored)
    }

    return []
  });

  useEffect(() => {
    const tasksToStore = JSON.stringify(tasks)

    localStorage.setItem("@todo-list:tasks-1.0.0", tasksToStore)
  }, [tasks])

  function handleAddNewTask(e: FormEvent) {
    e.preventDefault();

    const newTask = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      text: newTaskText,
      isCompleted: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText("");
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeletedTask = tasks.filter((task) => task.id !== taskId);

    setTasks(tasksWithoutDeletedTask);
  }

  function toogleTaskIsCompleted(taskId: string) {
    const tasksWithTaskIsCompletedUpdated = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    setTasks(tasksWithTaskIsCompletedUpdated);
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form className={styles.formNewTask} onSubmit={handleAddNewTask}>
          <input
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            type="text"
            placeholder="Adicione uma nova tarefa"
          />
          <button type="submit" disabled={newTaskText.trim().length === 0}>
            Criar <PlusCircle size={16} weight="bold" />
          </button>
        </form>

        <div className={styles.tasksContainer}>
          <HeaderTasksInfo tasks={tasks} />

          {tasks.length === 0 ? (
            <main className={styles.tasksMainEmpty}>
              <img src={clipboard} alt="Clipboard" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </main>
          ) : (
            <main className={styles.tasks}>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    handleDeleteTask={deleteTask}
                    handleToogleTaskIsCompleted={toogleTaskIsCompleted}
                  />
                );
              })}
            </main>
          )}
        </div>
      </div>
    </>
  );
}
