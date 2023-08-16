import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import Task from "../components/Task";
import { getAllTasks } from "../api/tasks";
import { useTaskContext } from "../contexts/TaskContext";
export default function Main() {
  const d = new Date().toDateString();
  const date = new Date(d);
  console.log(date);
  const { tasks, setTasks } = useTaskContext();

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full flex flex-col  p-5">
        <div className="lg:grid grid-cols-4 gap-5 flex flex-col">
          <div className="flex flex-col col-span-2 bg-white py-3 px-2">
            <h2 className="text-purple-600 border-b text-xl text-center font-semibold pb-2">Task to-do today</h2>
            <div className="flex flex-col pt-4  w-full gap-4">
              {tasks
                .filter((task) => {
                  const a = new Date(task.deadline).toDateString();
                  const b = new Date(a);
                  console.log(b, date, b == date);
                  return !(b > date) && !(b < date);
                })
                .map((task) => (
                  <Task {...task} />
                ))}
            </div>
          </div>

          <div className="flex flex-col col-span-1 bg-white py-3 px-2">
            <h2 className="text-purple-600 border-b text-xl text-center font-semibold pb-2">Upcoming tasks</h2>
            <div className="flex flex-col pt-4  w-full gap-4">
              {tasks
                .filter((task) => {
                  const a = new Date(task.deadline).toDateString();
                  const b = new Date(a);
                  // console.log(b, date, b == date);
                  return b > date;
                })
                .map((task) => (
                  <Task {...task} />
                ))}
            </div>
          </div>
          <div className="flex flex-col col-span-1 bg-white py-3 px-2">
            <h2 className="text-purple-600 border-b text-xl text-center font-semibold pb-2">Deadline passed</h2>
            <div className="flex flex-col pt-4  w-full gap-4">
              {tasks
                .filter((task) => {
                  const a = new Date(task.deadline).toDateString();
                  const b = new Date(a);
                  // console.log(b, date, b == date);
                  return b < date;
                })
                .map((task) => (
                  <Task {...task} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
