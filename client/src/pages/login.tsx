import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";

import LoginForm from "../components/auth/LoginForm";
import LoginSMS from "../components/auth/LoginSMS";
import SocialLogin from "../components/auth/SocialLogin";
import { GlobalTypes } from "../store/actions/action-types/global";

const Login = () => {
  const [isSMS, setIsSMS] = useState(false);

  //react-router-dom
  const history = useHistory();

  //redux
  const dispatch = useDispatch();
  const { auth } = useTypedSelector((state) => ({ ...state }));

  useEffect(() => {
    if (auth?.token) {
      history.push("/");
    }
  }, [auth?.token, history]);

  return (
    <div
      onClick={() => dispatch({ type: GlobalTypes.ALERT, payload: {} })}
      className="mt-6 flex flex-col items-center"
    >
      <div className="w-full lg:w-1/2 xl:w-1/3 px-8 max-w-md">
        
        <h2 className="sm:text-3xl text-center font-ds font-bold">Login</h2>
        <div className="mt-4">
          <SocialLogin />
        </div>
        {isSMS ? <LoginSMS /> : <LoginForm />}
      </div>
      <div className="w-full lg:w-1/2 xl:w-1/3 px-8 max-w-md flex flex-col space-y-4">
        <div className="w-full flex justify-between items-center text-sm">
          <span style={{ height: 1 }} className="w-1/4 bg-gray-300"></span>
          <span
            onClick={() => setIsSMS((prev) => !prev)}
            className="text-blue-400 cursor-pointer"
          >
            {isSMS ? "Sign in with password" : "Sign in with SMS"}
          </span>
          <span style={{ height: 1 }} className="w-1/4 bg-gray-300"></span>
        </div>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link className="text-red-500" to="/register">
            Signup
          </Link>
        </p>
        <Link className="text-center text-sm" to="/forgot_password">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
