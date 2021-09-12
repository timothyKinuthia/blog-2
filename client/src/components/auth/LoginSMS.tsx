import React, { useState } from 'react';
import { Link } from "react-router-dom";

const inputStyles =
  "w-full bg-gray-100 focus:bg-gray-50 focus:outline-none border border-gray-200 py-2 px-4 text-sm sm:text-base";

const LoginSMS = () => {
    const [phone, setPhone] = useState('');
    
    return (
        <form
        className="sm:mt-2 flex flex-col space-y-4 py-6"
        autoComplete="off"
      >
        <input
          className={inputStyles}
          type="phone"
          placeholder="Phone number"
          value={phone}
          onChange={(evt) => setPhone(evt.target.value)}
        />
            <button className={`w-full text-sm sm:text-base bg-red-500 hover:bg-red-400 text-white border py-2 px-4 font-semibold ${phone ? "" : "pointer-events-none"}`}>
          Login
        </button>
      </form>
    )
}

export default LoginSMS
