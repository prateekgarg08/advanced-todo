import React from "react";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import Task from "../components/Task";

export default function Main() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full flex flex-col  p-5">
        <div className="md:grid grid-cols-4 gap-2 flex flex-col">
          <div className="flex flex-col col-span-2 bg-black/30 py-3 px-2">
            <h2 className="text-white border-b text-xl">Task to-do today</h2>
            <div className="flex flex-col pt-4  w-full gap-4">
              <Task isCompleted={true} title={"Call Home"} />
              <Task isCompleted={true} title={"Call Home"} />
              <Task isCompleted={true} title={"Call Home"} />
            </div>
          </div>

          <div className="flex flex-col col-span-1 bg-black/30 py-3 px-2">
            <h2 className="text-white border-b text-xl">Upcoming tasks</h2>
            <div className="flex flex-col pt-4  w-full gap-4">
              <Task isCompleted={true} title={"Call Home"} />
              <Task isCompleted={true} title={"Call Home"} />
              <Task isCompleted={true} title={"Call Home"} />
            </div>
          </div>
          <div className="flex flex-col col-span-1 bg-black/30 py-3 px-2">
            <h2 className="text-white border-b text-xl">Deadline passed</h2>
            <div className="flex flex-col pt-4  w-full gap-4">
              <Task isCompleted={true} title={"Call Home"} />
              <Task isCompleted={true} title={"Call Home"} />
              <Task isCompleted={true} title={"Call Home"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
