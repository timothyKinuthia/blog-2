import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import RegisterForm from "../components/auth/RegisterForm";
import { GlobalTypes } from '../store/actions/action-types/global';

const Register = () => {

  //redux
  const dispatch = useDispatch();

  return (
    <div onClick={() => dispatch({type: GlobalTypes.ALERT, payload: {}})} className="mt-6 flex flex-col items-center">
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
