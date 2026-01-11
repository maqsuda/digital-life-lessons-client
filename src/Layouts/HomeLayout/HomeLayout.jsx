import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../pages/Navbar/Navbar";
import Footer from "../../pages/Footer/Footer";

const HomeLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
