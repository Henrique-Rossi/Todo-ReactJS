import React, { useState } from "react";
import "./styles.css";
import Navbar from "./components/NavBar/Navbar";
import TaskList from "./components/TaskList/TaskList";

/*função para gerar id unico*/
let idNew = 0;
const generateId = () => {
  idNew = idNew + 1;
  return idNew;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  /*Add task no banco*/
  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  /*Atualzia task no banco*/
  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  /*Add deleta  no banco*/
  const deleteTask = (id) => {
    setTasks((exitingTasks) => {
      return exitingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Todo"
          onAddTask={addTask}
          taskState="Todo"
          tasks={tasks.filter((t) => t.state === "Todo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />

        <TaskList
          title="Doing"
          onAddTask={addTask}
          taskState="Doing"
          tasks={tasks.filter((t) => t.state === "Doing")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />

        <TaskList
          title="Done"
          onAddTask={addTask}
          taskState="Done"
          tasks={tasks.filter((t) => t.state === "Done")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
