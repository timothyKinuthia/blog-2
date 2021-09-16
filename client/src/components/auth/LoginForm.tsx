import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

//
import { loginUser } from "../../store/actions/action-creators/authActions";

const inputStyles =
  "w-full bg-gray-100 focus:bg-gray-50 focus:outline-none border border-gray-200 py-2 px-4 text-sm sm:text-base";

const LoginForm = () => {
  //state
  const [input, setInput] = useState({
    account: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  //redux
  const dispatch = useDispatch();

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [evt.target.name]: evt.target.value });
    };
    
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginUser(input));
  };

  return (
    <form onSubmit={handleSubmit}
      className="sm:mt-2 flex flex-col space-y-4 py-6"
      autoComplete="off"
    >
      <input
        className={inputStyles}
        type="text"
        name="account"
        placeholder="Enter your email or phone number"
        value={input.account}
        onChange={handleInputChange}
      />
      <div className="relative w-full">
        <span className="absolute right-3 top-2.5 text-gray-400 text-xl">
          {showPassword ? (
            <span onClick={() => setShowPassword(false)}>
              <IoMdEyeOff />
            </span>
          ) : (
            <span onClick={() => setShowPassword(true)}>
              <IoMdEye />
            </span>
          )}
        </span>
        <input
          className={inputStyles}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={handleInputChange}
        />
      </div>
          <button className={`w-full text-sm sm:text-base bg-ro hover:bg-opacity-90 text-white border py-2 px-4 font-semibold ${(!input.account || !input.password) ? "pointer-events-none" : ""}`}>
        Login
      </button>
    </form>
  );
};
export default LoginForm;
