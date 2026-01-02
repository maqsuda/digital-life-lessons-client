import { Link, NavLink } from "react-router";
import { useState } from "react";
import Logo from "../logo/Logo";
import useAuth from "../../hooks/useAuth";
import { FaStairs, FaStar } from "react-icons/fa6";
import { IoDiamond } from "react-icons/io5";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [isPremium, setIsPremium] = useState();
  const toggleDropdown = () => setOpen((dropdown) => !dropdown);
  // const { email } = useParams();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(() => {});
  };
  console.log("Email ", user?.email);
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: userInfo } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      // console.log(res.data?.isPremium);
      setIsPremium(res.data.isPremium);
      return res.data;
    },
  });

  // const handlePayment = async () => {
  //   const paymentInfo = {
  //     cost: userInfo.price,
  //     userId: userInfo._id,
  //     userEmail: userInfo.email,
  //     userName: userInfo.name,
  //   };
  //   paymentInfo.cost = 1500;
  //   // console.log(paymentInfo);
  //   const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
  //   // console.log(res.data);
  //   window.location.assign(res.data.url);
  // };

  // if (isLoading) {
  //   return <Loading></Loading>;
  // }
  if (isLoading) return <Loading></Loading>;
  const links = (
    <>
      <li className="hover:bg-primary hover:text-white rounded-md">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="hover:bg-[#035372] hover:text-white rounded-md">
        <NavLink to="/public-lessons">Public Lessons</NavLink>
      </li>
      {/* <li>{userInfo?.user?.price}</li> */}
    </>
  );

  return (
    <div className="navbar bg-base-100 rounded-xl visible sticky top-0 z-50 px-10">
      <div className="navbar-start ">
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
            className="menu menu-sm bg-base-100 dropdown-content z-1 mt-3 w-52 p-2 hover:bg-secondary"
          >
            {links}
          </ul>
        </div>
        <span className="hidden md:flex">
          <Logo></Logo>
        </span>
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
                <div className="flex gap-2 items-center">
                  {/* <button>
                    <Link to={`/users/${user.email}`}>
                      <span className="flex gap-2 justify-center items-center bg-primary text-white font-bold rounded-2xl px-2">
                        <IoDiamond /> Upgrade to Premium
                      </span>
                    </Link>
                  </button> */}

                  {isPremium ? (
                    <span className="flex gap-2 justify-center items-center text-primary font-bold rounded-2xl px-2">
                      Premium <FaStar className="text-yellow-300"></FaStar>
                    </span>
                  ) : (
                    <button>
                      <Link to={`/users/${userInfo.email}`}>
                        <span className="flex gap-2 justify-center items-center bg-primary text-white font-bold rounded-2xl px-2">
                          <IoDiamond /> Upgrade to Premium
                        </span>
                      </Link>
                    </button>
                  )}

                  {/* <button onClick={handlePayment}>
                      <span className="flex gap-2 justify-center items-center bg-primary text-white font-bold rounded-2xl px-2">
                        <IoDiamond /> Upgrade to Premium
                      </span>
                    </button> */}

                  <button onClick={toggleDropdown} className="dropdown-button">
                    <img
                      src={user.photoURL}
                      className="size-12 rounded-full"
                    ></img>
                  </button>
                </div>

                {open && (
                  <ul className="menu dropdown-content dropdown-right bg-[#F0F0F1]">
                    {/* <li className="pt-5"> {user && user.email}</li> */}

                    <li className="btn w-[220px] hover:font-bold">
                      {" "}
                      {user && user.displayName}
                    </li>
                    {/* 
                    <li className="">
                      <NavLink
                        to="/profile"
                        className="w-[120px] hover:font-bold hover:text-white hover:bg-[#035372]"
                      >
                        Profile
                      </NavLink>
                    </li> */}

                    <li className="btn  hover:text-white hover:bg-[#035372]">
                      <NavLink
                        to="/dashboard"
                        className="w-[120px] hover:font-bold"
                      >
                        Dashboard
                      </NavLink>
                    </li>

                    <li className="btn  hover:text-white hover:bg-[#035372]">
                      <button
                        onClick={handleLogout}
                        className="border-none text-start items-start hover:font-bold"
                      >
                        LogOut
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn  text-white bg-[#035372]">
                LogIn
              </Link>
              <Link to="/register" className="btn  text-white bg-[#035372]">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
