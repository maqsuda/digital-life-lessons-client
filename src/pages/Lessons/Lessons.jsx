import React from "react";
import { useForm } from "react-hook-form";

const Lessons = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddLessons = () => {
    console.log("Test");
  };

  return (
    <div>
      <h2>
        <Logo></Logo>Add Lessons
      </h2>
      <form onSubmit={handleSubmit(handleAddLessons)}>
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label text-white">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required.</p>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default Lessons;
