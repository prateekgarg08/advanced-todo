import React, { useState } from "react";
import logo from "../../assets/logo.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import AddTask from "../AddTask";
export default function Navbar() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthContext();
  const [show, setShow] = useState(false);
  return (
    <div className="w-full flex justify-between px-5 py-5 items-center bg-white">
      {show && <AddTask setShow={setShow} />}
      <div className="flex items-center gap-3">
        <img src={logo} width={50} alt={"logo"} />
        <span className="hidden md:block text-purple-600 lg:first-letter:text-xl font-bold tracking-wide">
          Task Manager
        </span>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setShow(true)} className="rounded-lg">
          {" "}
          + Add a task
        </Button>
        <Button
          className="rounded-lg"
          onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            navigate("/");
          }}
        >
          {" "}
          Logout
        </Button>
      </div>
    </div>
  );
}
