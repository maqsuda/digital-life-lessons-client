import React from "react";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
// import { format } from "date-fns";

const Lesson = ({ lesson }) => {
  const {
    title,
    description,
    category,
    privacy,
    accessLevel,
    CreateBy,
    photo,
    CreateDate,
  } = lesson;

  const creatingDate = new Date(CreateDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card bg-base-100 shadow-sm ">
      <div className="bg-primary h-[150px] text-md font-bold flex justify-center text-center items-center px-3 text-white rounded-t-xl">
        {title}
      </div>
      <div className="card-body">
        <h2 className="">
          <div className="text-md">Category : {category}</div>
        </h2>
        <p>{description}</p>
        <div className="flex justify-between gap-2 text-xs">
          <h2>Privacy : {privacy}</h2>
          <h2>Access Level :{accessLevel}</h2>
        </div>

        <div className="flex text-xs gap-2">
          <div>
            {" "}
            <span>
              <img className="rounded-full size-8" src={photo}></img>
            </span>
          </div>
          <div>
            {" "}
            Creator : {CreateBy}
            <br /> Create Date :{creatingDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
