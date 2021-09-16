import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { GlobalTypes } from "../../store/actions/action-types/global";

interface ToastProps {
  title: string;
  text: string | string[];
  success?: boolean;
}

const Toast: React.FC<ToastProps> = ({ text, title, success }) => {
  //redux
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: GlobalTypes.ALERT, payload: {} });
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div
      className={`fixed top-1 right-2 z-30 shadow-2xl py-2 text-white ${
        success ? "bg-green" : "bg-ro"
      } transition border-2 ${success ? "" : "border-red"}`}
    >
      <div
        className={`border-b ${success ? "border-dg" : "border-red"} pb-1 px-4`}
      >
        <h3 className="text-lg sm:text-xl text-center font-bold capitalize">
          {title}
        </h3>
      </div>
      <div className="py-2 px-4 text-center capitalize">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Toast;
