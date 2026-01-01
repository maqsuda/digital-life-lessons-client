import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../pages/Navbar/Navbar";
import Footer from "../../pages/Footer/Footer";

const HomeLayout = () => {
  return (
    <div className=" ">
      <Navbar></Navbar>
      <Outlet className="w-11/12 mx-auto"></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
