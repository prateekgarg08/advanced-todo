import React from "react";
import logo from "../assets/logo.png";
import Input from "./common/Input";
import Button from "./common/Button";

function SignInComponent() {
  return (
    <div className="bg-white max-w-xl w-full px-3 py-3 md:p-5 lg:px-10 lg:py-10 flex flex-col gap-4">
      <div>
        <img src={logo} width={50} alt={"logo"} />
      </div>
      <h1 className="text-xl font-medium text-purple-500 tracking-wide ">SignIn</h1>
      <Input name="name" label="Name" type="text" />
      <Input name="email" label="E-mail" type="email" />
      <Input name="password" label="Password" type="password" />
      <div className="flex w-full justify-between items-center">
        <a href="" className="text-purple-500 text-sm">
          Already have an account? Login In.
        </a>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default SignInComponent;
