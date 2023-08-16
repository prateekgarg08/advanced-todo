import React, { useState } from "react";
import logo from "../assets/logo.png";
import Input from "./common/Input";
import Button from "./common/Button";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
function LoginComponent() {
  const navigate = useNavigate();
  const date = new Date();
  const [details, setDetails] = useState({ email: "", password: "", deadline: date.getDate() });
  const { setIsLoggedIn } = useAuthContext();
  function handleChange(e) {
    console.log("e");
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
    try {
      const data = await login(details);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
      }
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="bg-white max-w-xl w-full px-3 py-3 md:p-5 lg:px-10 lg:py-10 flex flex-col gap-4">
      <div>
        <img src={logo} width={50} alt={"logo"} />
      </div>
      <h1 className="text-xl font-medium text-purple-600 tracking-wide ">Login</h1>
      <Input name="email" label="E-mail" type="email" value={details.email} handleChange={handleChange} />
      <Input name="password" label="Password" type="password" value={details.password} handleChange={handleChange} />
      <div className="flex w-full justify-between items-center">
        <Link to="/signin" className="text-purple-600 text-sm">
          Dont have an account? Sign up.
        </Link>
        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
}

export default LoginComponent;
