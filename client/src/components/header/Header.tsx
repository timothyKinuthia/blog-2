import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypeSelector";

//imports
import UserMenu from "./UserMenu";

const Header = () => {
  const [search, setSearch] = useState("");

  //redux
  const { auth } = useTypedSelector((state) => ({ ...state }));

  const bflinks = [{ name: "Login/Signup", path: "/login" }];

  const aflinks = [{ name: "Create Blog", path: "/create_blog" }];

  const navLinks = auth?.token ? aflinks : bflinks;

  const { pathname } = useLocation();

  const activePath = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="flex justify-center">
      <div className="w-5/6 py-4 px-2 sm:px-6 flex justify-between items-center">
        <Link to="/">
          <span className="mr-4 text-lg sm:text-3xl font-bold font-ds">
            Home
          </span>
        </Link>
        <div className="flex items-center space-x-8 sm:flex-1">
          <input
            className="hidden sm:block px-2 ml-4 py-1 border flex-1 focus:outline-none border-gray-100"
            type="text"
            placeholder="Enter to search..."
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />
          {navLinks.map((val, i) => (
            <Link
              to={val.path}
              key={i}
              className={`${
                activePath(val.path) ? "text-gray-800" : "text-gray-400"
              } font-semibold text-sm sm:text-base`}
            >
              {val.name}
            </Link>
          ))}
          {auth?.token && <UserMenu avatar={auth.user.avatar} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
