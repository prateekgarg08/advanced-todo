import React, { useEffect, useMemo, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { deleteTask, updateTask } from "../api/tasks";
import { useTaskContext } from "../contexts/TaskContext";
import { toast } from "react-toastify";
export default function Task({ _id: id, isCompleted, title, description, deadline }) {
  const [show, setShow] = useState(isCompleted);
  const [expand, setExpand] = useState(false);
  const { tasks, setTasks } = useTaskContext();

  const handleUpdateState = async () => {
    console.log(!isCompleted);
    try {
      const data = await updateTask(id, {
        title,
        description,
        isCompleted: !isCompleted,
        deadline,
      });
      if (data.task) {
        console.log("here");
        setTasks(
          tasks.map((t) => {
            console.log(id == t._id);
            if (t._id != id) {
              return t;
            } else {
              return data.task;
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    try {
      toast("Please wait");
      const data = await deleteTask(id);
      setTasks((obj) => obj.filter((t) => t._id != id));
      toast.success("Deleted sucessfully");
    } catch (err) {
      console.log(err);
      toast.success(err.toString());
    }
  };

  return (
    <div className="text-purple-600 flex items-start text-lg  gap-2">
      <div className="flex grow gap-2 items-start">
        <button
          className="border mt-1   border-purple bg-white rounded  p-1 w-[25px] h-[25px]"
          onClick={handleUpdateState}
        >
          {isCompleted && (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path
                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                style={{ fill: "#a855f7" }}
              />
            </svg>
          )}
        </button>
        <div className="flex flex-col transition-all">
          <span>{title}</span>
          {description && expand && <span className="transition-all">{description}</span>}
        </div>
      </div>
      <div className="flex mt-1 gap-2 items-center ">
        {description && (
          <span onClick={() => setExpand(!expand)} className="cursor-pointer">
            {!expand ? <AiFillCaretDown /> : <AiFillCaretUp />}
          </span>
        )}
        <span className="text-sm ">
          {new Date(deadline).getDate()}/{new Date(deadline).getMonth()}/{new Date(deadline).getFullYear()}
        </span>

        <BsFillTrashFill className="cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  );
}
