import React from "react";

interface ToastProps {
  title: string;
  text: string | string[];
  success?: boolean;
}

const Toast: React.FC<ToastProps> = ({ text, title, success }) => {

  return (
    <div
      className={`fixed -mt-2 w-full py-2 text-white ${
        success ? "bg-green" : "bg-ro"
      } transition border-2 ${success ? "" : "border-red"}`}
    >
      <div
        className=" pb-1 px-4"
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
