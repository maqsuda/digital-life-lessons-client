import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="h-full w-11/12 mx-auto">
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <div className="flex mx-auto w-full relative">
          <img src="/src/assets/FNF.jpg" className="object-cover w-full"></img>
        </div>

        <div className="flex justify-center items-center px-4 py-2 gap-2 text-2xl hover:bg-[#FFCD00] absolute top-20 bg-transparent  text-[#CE2600] font-bold">
          <FaArrowLeft />
          <NavLink to="/" className="">
            Back to Home
          </NavLink>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default ErrorPage;
