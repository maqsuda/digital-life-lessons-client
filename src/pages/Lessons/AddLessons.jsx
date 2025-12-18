import React from "react";
import { useForm } from "react-hook-form";

const AddLessons = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleAddLesson = (data) => {
    console.log("after register", data);
  };

  return (
    <div className="">
      <h2 className="text-center py-5 text-2xl font-bold ">Add Lesson</h2>
      <form
        className="card-body mx-auto w-1/2  "
        onSubmit={handleSubmit(handleAddLesson)}
      >
        <fieldset className="grid grid-cols-3">
          {/* Lesson Title field */}
          <label className="label col-span-1">Lesson Title</label>
          <input
            type="text"
            {...register("lessonTitle", { required: true })}
            className="input col-span-2"
            placeholder="Your Lesson Title"
          />
          {errors.lessonTitle?.type === "required" && (
            <p className="text-red-500">Lesson Title is required.</p>
          )}

          {/* Short Description field */}
          <label className="label mt-2 col-span-1">Short Description</label>
          <input
            type="text"
            {...register("shortDescription", { required: true })}
            className="input col-span-2 mt-2"
            placeholder="Short Description"
          />
          {errors.shortDescription?.type === "required" && (
            <p className="text-red-500">Short Description is required.</p>
          )}

          {/* Category field */}
          <label className="label col-span-1">Category</label>
          <input
            type="text"
            {...register("category", { required: true })}
            className="input mt-2 col-span-2"
            placeholder="Category"
          />
          {errors.category?.type === "required" && (
            <p className="text-red-500">Category is required.</p>
          )}

          {/* Emotional Tone field */}
          <label className="label col-span-1">Emotional Tone</label>
          <input
            type="text"
            {...register("emotionalTone", { required: true })}
            className="input col-span-2 mt-2"
            placeholder="Emotional Tone"
          />
          {errors.emotionalTone?.type === "required" && (
            <p className="text-red-500">Emotional Tone is required.</p>
          )}
          {/* Access level Tone field */}
          <label className="label col-span-1">Access level</label>
          <input
            type="text"
            {...register("accessLevel", { required: true })}
            className="input col-span-2 mt-2"
            placeholder="Access level"
          />
          {errors.accessLevel?.type === "required" && (
            <p className="text-red-500">Access level is required.</p>
          )}
          <span className="col-span-1"></span>
          <button className="btn btn-primary col-span-2 mt-5">
            Add Lesson
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLessons;
