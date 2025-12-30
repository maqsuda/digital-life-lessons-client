import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import { MdPublic } from "react-icons/md";
import { RiChatPrivateFill } from "react-icons/ri";

const FeatureLessonCard = ({ featureLesson }) => {
  const {
    title,
    description,
    category,
    privacy,
    accessLevel,
    CreateBy,
    name,
    photo,
    CreateDate,
  } = featureLesson;

  const creatingDate = new Date(CreateDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card bg-base-100 shadow-sm  ">
      <div className="">
        <div className="flex justify-between">
          {/* Left */}
          <div className="flex text-xs gap-2 py-1 items-center px-2">
            <div>
              <span>
                <img className="rounded-full size-6 " src={photo}></img>
              </span>
            </div>
            <div className="text-[8px]">
              <span className="font-bold"> {name}</span>
              <br />
              <div className="flex gap-1">
                {" "}
                {creatingDate}
                {privacy === "public" && (
                  <span className="size-0 tooltip text-xs" data-tip="Public">
                    <MdPublic />
                  </span>
                )}
                {privacy === "private" && (
                  <span className="size-0 tooltip text-xs" data-tip="Private">
                    <RiChatPrivateFill />
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="flex py-1 pr-1">
            <div className="hover:bg-base-300 rounded-full py-1 size-6 px-1">
              <HiDotsHorizontal />
            </div>
            <div className="hover:bg-base-300 rounded-full size-6 text-[8px] pt-2 pl-2">
              <ImCross />
            </div>
          </div>
        </div>
        <div className="text-[10px] px-1">{title}</div>
      </div>

      <div className="bg-primary h-[150px] text-md font-bold flex justify-center text-center items-center px-3 text-white">
        {description}
      </div>
      <div className="px-2 py-1 bg-base-200">
        <div className="text-xs pt-1">Category : {category}</div>
        <div className=" text-xs pt-1">
          <h2>Access Level :{accessLevel}</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 text-[10px] pt-2 items-center justify-center ">
        <div className="flex gap-1 items-center hover:bg-base-300 justify-center py-1">
          <AiOutlineLike /> Like
        </div>
        <div className="flex gap-1 items-center hover:bg-base-300 justify-center py-1">
          <FaRegComment /> Comments
        </div>
        <div className="flex gap-1 items-center hover:bg-base-300 justify-center py-1">
          <FaRegShareFromSquare />
          Share
        </div>
      </div>
    </div>
  );
};

export default FeatureLessonCard;
