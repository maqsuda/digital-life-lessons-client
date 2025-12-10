import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="Login_Item">
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
