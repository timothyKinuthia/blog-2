import React, { useState } from "react";
import { Link } from "react-router-dom";

import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="w-full lg:w-1/2 xl:w-1/3 px-8 max-w-md">
        <h2 className="sm:text-3xl text-center font-ds font-bold">Welcome</h2>
        <RegisterForm/>
      </div>
      <div className="w-full lg:w-1/2 xl:w-1/3 px-8 max-w-md flex flex-col space-y-4">
        
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-red-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
