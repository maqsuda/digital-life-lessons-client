import React from "react";
// import img from "../../assets/Image.jpg";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="Login_Item flex justify-between items-center gap-10 px-20">
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      {/* <div className="flex-1">
        <img src={img}></img>
      </div> */}
    </div>
  );
};

export default AuthLayout;
