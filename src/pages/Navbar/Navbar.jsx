import { Link, NavLink } from "react-router";
import { useState } from "react";
import Logo from "../logo/Logo";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen((dropdown) => !dropdown);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(() => {});
  };

  const links = (
    <>
      <li className="hover:bg-primary hover:text-white rounded-md">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="hover:bg-[#035372] hover:text-white rounded-md">
        <NavLink to="/public-lessons">Public Lessons</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 m-2 rounded-2xl ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content z-1 mt-3 w-52 p-2 hover:bg-secondary"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">{links}</ul>
      </div>
      <div className="navbar-end">
        {/* {user && user.email} */}

        <div>
          {user ? (
            <div className="flex gap-3">
              {/* Drop Down */}
              <div className="dropdown">
                <button onClick={toggleDropdown} className="dropdown-button">
                  <img
                    src={user.photoURL}
                    className="size-12 rounded-full"
                  ></img>
                </button>

                {open && (
                  <ul className="menu dropdown-content dropdown-right bg-[#F0F0F1]">
                    {/* <li className="pt-5"> {user && user.email}</li> */}

                    <li className="">
                      <NavLink
                        to="/profile"
                        className="w-[120px] hover:font-bold hover:text-[#CE2600] hover:bg-[#FFCD00]"
                      >
                        Profile
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard"
                        className="w-[120px] hover:font-bold hover:text-[#CE2600] hover:bg-[#FFCD00] "
                      >
                        Dashboard
                      </NavLink>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="px-3 border-none text-start items-start hover:font-bold hover:text-[#CE2600] hover:bg-[#FFCD00] "
                      >
                        LogOut
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {/* <button
                onClick={handleLogout}
                className="btn px-10 bg-[#388148] text-white"
              >
                LogOut
              </button> */}
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn  text-white bg-[#CE2600]">
                LogIn
              </Link>
              {/* <Link to="/register" className="btn  text-white bg-[#CE2600]">
                Register
              </Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
