import React from "react";
import logo from "../../assets/logo.jpg";

const Logo = () => {
  return (
    <div>
      <a className="flex flex-row items-center text-sm md:text-xl text-secondary">
        <span>
          <img className="size-6 md:size-10" src={logo}></img>
        </span>
        Digital Life Lessons
      </a>
    </div>
  );
};

export default Logo;
