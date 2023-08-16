import React, { useState } from "react";
import Input from "./common/Input";
import Button from "./common/Button";
import { createTask, updateTask } from "../api/tasks";
import { useTaskContext } from "../contexts/TaskContext";
import { toast } from "react-toastify";
export default function EditTask({ setShow, id, title, description, deadline }) {
  const { setTasks, tasks } = useTaskContext();
  const date = new Date(deadline);
  // console.log(`${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}-${date.getDate()}`);
  const [details, setDetails] = useState({
    title: title,
    description: description,
    deadline: `${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}-${date.getDate()}`,
  });
  function handleChange(e) {
    const { name, value } = e.target;
    console.log(value);
    if (e.target.name == name) {
      setDetails((obj) => {
        return {
          ...obj,
          [name]: value,
        };
      });
    }
  }
  const handleSubmit = async () => {
    console.log("Submitting");
    if (details.title.length < 1 || details.title.length > 50) {
      toast.warn("Title must be of length <=50 and > 1");
      return;
    }
    if (details.description.length < 5 || details.description.length > 100) {
      toast.warn("Description must be of length <=100 and > 5");
      return;
    }
    if (details.deadline.length < 1) {
      toast.warn("Deadline must be present");
      return;
    }
    try {
      toast("Please Wait");
      const data = await updateTask(id, details);
      if (!data.task) throw Error(data.response.data.msg);
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
      // toast.success("Successfully updated task");
      setShow(false);
    } catch (err) {
      console.log(err);
      toast.error(err.toString());

      setShow(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black/20">
      <div className="absolute inset-0" onClick={() => setShow(false)}></div>
      <div className=" relative z-10 max-w-xl w-full bg-white  flex flex-col px-4 py-3 gap-4">
        <h2 className="text-xl font-bold text-purple-600">Edit Task</h2>
        <div className="flex flex-col gap-3">
          <Input label={"title"} name={"title"} value={details.title} handleChange={handleChange} />
          <Input
            type="text"
            label={"description"}
            name={"description"}
            value={details.description}
            handleChange={handleChange}
          />
          <h3 className="text-lg text-purple-600">Deadline</h3>
          {/* <Input type={"time"} label={"time"} name={"time"} value={details.deadline} handleChange={handleChange} /> */}
          <Input
            type={"date"}
            label={"deadline"}
            name={"deadline"}
            value={details.deadline}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full flex justify-center">
          <Button onClick={handleSubmit}>Update</Button>
        </div>
      </div>
    </div>
  );
}
