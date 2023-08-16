import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import Input from "./common/Input";
import Button from "./common/Button";
import { useAuthContext } from "../contexts/AuthContext";
import { signin } from "../api/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function SignInComponent() {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const { setIsLoggedIn } = useAuthContext();
  function handleChange(e) {
    const { name, value } = e.target;

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

    if (!details.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/)) {
      toast.warn("Use valid email");
      return;
    }
    if (details.password.length < 6) {
      toast.warn("Password must be atleast of length 6");
      return;
    }
    if (details.name.length < 3) {
      toast.warn("Name must be atleast of length 3");
      return;
    }
    try {
      const data = await signin(details);
      localStorage.setItem("token", data.token);

      setIsLoggedIn(true);
    } catch (err) {
      // setIsLoggedIn(false);
      console.log(err);
    }
  };
  return (
    <div className="bg-white max-w-xl w-full px-3 py-3 md:p-5 lg:px-10 lg:py-10 flex flex-col gap-4">
      <div>
        <img src={logo} width={50} alt={"logo"} />
      </div>
      <h1 className="text-xl font-medium text-purple-600 tracking-wide ">SignIn</h1>
      <Input name="name" label="Name" type="text" handleChange={handleChange} value={details.name} />
      <Input name="email" label="E-mail" type="email" handleChange={handleChange} value={details.enail} />
      <Input name="password" label="Password" type="password" handleChange={handleChange} value={details.password} />
      <div className="flex w-full justify-between items-center">
        <Link to="/" className="text-purple-600 text-sm">
          Already have an account? Login In.
        </Link>
        <Button onClick={handleSubmit}>Sign In</Button>
      </div>
    </div>
  );
}

export default SignInComponent;
