import React from "react";
// import img from "../../assets/Image.jpg";
import { Outlet } from "react-router";
import Navbar from "../../pages/Navbar/Navbar";
import Footer from "../../pages/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-between items-center gap-10 px-20">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        {/* <div className="flex-1">
        <img src={img}></img>
      </div> */}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
