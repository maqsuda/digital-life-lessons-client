import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddLessons = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const digitalData = useLoaderData();
  const categoryData = digitalData.map((c) => c.category);
  const categorys = [...new Set(categoryData)];

  const emotionalToneData = digitalData.map((c) => c.emotionalTone);
  const emotionalTones = [...new Set(emotionalToneData)];

  const privacyData = digitalData.map((c) => c.privacy);
  const privacys = [...new Set(privacyData)];

  const accessLevelData = digitalData.map((c) => c.accessLevel);
  const accessLevels = [...new Set(accessLevelData)];

  const handleAddLesson = (data) => {
    console.log("after register", data);
    data.CreateBy = user.email;
    data.CreateDate = new Date();
    axiosSecure
      .post("/add-lessons", data)
      .then((res) => {
        if (res.data.insertedId) {
          navigate("/dashboard/my-lessons");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Data is Successfully Added.",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <h2 className="text-center py-5 text-2xl font-bold ">Add Lesson</h2>
      <form
        className="card-body w-1/2 mx-auto"
        onSubmit={handleSubmit(handleAddLesson)}
      >
        <fieldset className="fieldset">
          {/* Title field */}
          <label className="fieldset-legend">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input w-full"
            placeholder="Title"
          />{" "}
          {errors.title?.type === "required" && (
            <p className="text-red-500">Title is required.</p>
          )}
          {/* Description field */}
          <label className="fieldset-legend">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full bg-white textarea h-24"
            placeholder="Description"
          />{" "}
          {errors.description?.type === "required" && (
            <p className="text-red-500">Description is required.</p>
          )}
          {/* Category field */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Category</legend>
            <select
              {...register("category", { required: true })}
              className="select w-full"
              defaultValue="Pick a Category"
            >
              <option disabled={true}>Pick a Category</option>
              {categorys.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>
          {errors.category?.type === "required" && (
            <p className="text-red-500">Category is required.</p>
          )}
          {/* Emotional Tone field */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Emotional Tone</legend>
            <select
              {...register("emotionalTone", { required: true })}
              className="select w-full"
              defaultValue="Pick a Emotional Tone"
            >
              <option disabled={true}>Pick a Emotional Tone</option>
              {emotionalTones.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>
          {errors.emotionalTone?.type === "required" && (
            <p className="text-red-500">Emotional Tone is required.</p>
          )}
          {/* Privacy field */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Privacy</legend>
            <select
              {...register("privacy", { required: true })}
              className="select w-full"
              defaultValue="Pick a Privacy"
            >
              <option disabled={true}>Pick a Privacy</option>
              {privacys.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>
          {errors.privacy?.type === "required" && (
            <p className="text-red-500">Privacy is required.</p>
          )}
          {/* Access level Tone field */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Access Level</legend>
            <select
              {...register("accessLevel", { required: true })}
              className="select w-full"
              defaultValue="Pick a Access Level"
            >
              <option disabled={true}>Pick a Access Level</option>
              {accessLevels.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>
          {errors.accessLevel?.type === "required" && (
            <p className="text-red-500">Access Level is required.</p>
          )}
          <span className=""></span>
          <button className="btn btn-primary">Add Lesson</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLessons;
