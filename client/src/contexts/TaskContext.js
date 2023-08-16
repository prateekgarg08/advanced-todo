import { createContext, useState, useEffect, useContext } from "react";

import { getAllTasks } from "../api/tasks";
const TaskContext = createContext()


const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllTasks();
        console.log(data);
        setTasks(data.tasks);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return <TaskContext.Provider value={{ tasks, setTasks }}>
    {children}
  </TaskContext.Provider>
}
export function useTaskContext() {
  return useContext(TaskContext)
}

export { TaskProvider }
