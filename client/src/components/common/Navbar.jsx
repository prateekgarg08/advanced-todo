import React from "react";
import logo from "../../assets/logo.png";
import Button from "./Button";
export default function Navbar() {
  return (
    <div className="w-full flex justify-between px-5 py-5 items-center bg-white">
      <div className="flex items-center gap-3">
        <img src={logo} width={50} alt={"logo"} />
        <span className="hidden md:block text-purple-500 lg:first-letter:text-xl font-bold tracking-wide">
          Task Manager
        </span>
      </div>
      <div>
        <Button className="rounded-lg"> + Add a task</Button>
      </div>
    </div>
  );
}
