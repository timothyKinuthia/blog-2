import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

import { loginSMS } from "../../store/actions/action-creators/authActions";
import { useTypedSelector } from '../../hooks/useTypeSelector';

const inputStyles =
  "w-full bg-gray-100 focus:bg-gray-50 focus:outline-none border border-gray-200 py-2 px-4 text-sm sm:text-base";

const LoginSMS = () => {
  const [phone, setPhone] = useState('');
  
  //redux
  const dispatch = useDispatch();
  const { alert } = useTypedSelector((state) => ({ ...state }));

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginSMS(phone));
  }
    
    return (
      <form
        onSubmit={handleSubmit}
        className="sm:mt-2 flex flex-col space-y-4 py-6"
        autoComplete="off"
      >
        <input
          className={inputStyles}
          type="phone"
          placeholder="+8564334232"
          value={phone}
          onChange={(evt) => setPhone(evt.target.value)}
        />
            <button className={`w-full text-sm sm:text-base bg-ro hover:bg-opacity-90 text-white border py-2 px-4 font-semibold ${phone ? "" : "pointer-events-none"}`}>
            {alert?.loading ? <Loader
          type="TailSpin"
          color="#FFF"
          height={25}
          width={25}
          timeout={30000} //3 secs
        /> : "Login"}
        </button>
      </form>
    )
}

export default LoginSMS
