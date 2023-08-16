import React, { useState } from "react";
import logo from "../assets/logo.png";
import Input from "./common/Input";
import Button from "./common/Button";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
function LoginComponent() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ email: "", password: "" });
  const { setIsLoggedIn } = useAuthContext();
  function handleChange(e) {
    console.log("e");
    console.log(e.target.value);
    if (e.target.name == "email") {
      setDetails((obj) => {
        return {
          ...obj,
          email: e.target.value,
        };
      });
    }
    if (e.target.name == "password") {
      setDetails((obj) => {
        return {
          ...obj,
          password: e.target.value,
        };
      });
    }
  }

  const handleSubmit = async () => {
    console.log("Submitting");
    try {
      const data = await login(details);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="bg-white max-w-xl w-full px-3 py-3 md:p-5 lg:px-10 lg:py-10 flex flex-col gap-4">
      <div>
        <img src={logo} width={50} alt={"logo"} />
      </div>
      <h1 className="text-xl font-medium text-purple-500 tracking-wide ">Login</h1>
      <Input name="email" label="E-mail" type="email" value={details.email} handleChange={handleChange} />
      <Input name="password" label="Password" type="password" value={details.password} handleChange={handleChange} />
      <div className="flex w-full justify-between items-center">
        <Link to="/signin" className="text-purple-500 text-sm">
          Dont have an account? Sign up.
        </Link>
        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
}

export default LoginComponent;
