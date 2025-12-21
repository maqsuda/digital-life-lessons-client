import React from "react";

const Lesson = ({ lesson }) => {
  const {
    lessonTitle,
    shortDescriptionPreview,
    category,
    privacy,
    accessLevel,
  } = lesson;
  return (
    <div className="card bg-base-100 shadow-sm ">
      <div className="bg-primary h-[150px] text-xl font-bold flex justify-evenly items-center px-3 text-white rounded-t-xl">
        {lessonTitle}
      </div>
      <div className="card-body">
        <h2 className="card-title">
          <div className="badge badge-secondary">{category}</div>
        </h2>
        <p>{shortDescriptionPreview}</p>
        <div className="card-actions justify-end">
          <div className="bg-secondary px-2 py-1 text-white rounded-xl">
            {privacy}
          </div>
          <div className="bg-secondary px-2 py-1 text-white rounded-xl">
            {accessLevel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
