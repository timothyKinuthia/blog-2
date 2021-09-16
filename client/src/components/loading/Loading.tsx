import React from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

const Loading = () => {
  return (
    <div className="absolute inset-0 z-10 flex justify-center items-center bg-white">
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg sm:text-2xl font-black">
          H
          <span className="inline-block ml-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="mt-0.5 ml-0.5 w-1 h-2.5 bg-black"></div>
          </span>{" "}
          great friend, how are you?
        </h2>
      </div>
    </div>
  );
};

export default Loading;
