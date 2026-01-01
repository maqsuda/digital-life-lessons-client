import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { useForm } from "react-hook-form";

const EditLesson = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { lessonId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: lesson } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lesson/${lessonId}`);
      return res.data;
    },
  });

  const digitalData = useLoaderData();
  const categoryData = digitalData.map((c) => c.category);
  const categorys = [...new Set(categoryData)];

  const emotionalToneData = digitalData.map((c) => c.emotionalTone);
  const emotionalTones = [...new Set(emotionalToneData)];

  const privacyData = digitalData.map((c) => c.privacy);
  const privacys = [...new Set(privacyData)];

  const accessLevelData = digitalData.map((c) => c.accessLevel);
  const accessLevels = [...new Set(accessLevelData)];

  const handleEdit = async () => {
    // title : lesson.title,
    // description : lesson.description
  };

  if (isLoading) return <Loading></Loading>;
  return (
    <div>
      <h2 className="py-5 text-2xl font-bold underline text-center">
        Edit Lesson
      </h2>
      <div className="w-1/2 mx-auto justify-center">
        <form>
          <fieldset className="fieldset">
            {/* Title field */}
            <label className="fieldset-legend">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input w-full"
              placeholder="Title"
              value={lesson.title}
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
              value={lesson.description}
            />{" "}
            {errors.description?.type === "required" && (
              <p className="text-red-500">Description is required.</p>
            )}
            {/* Category field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Category</legend>
              <select
                {...register("category", {
                  required: "Category is required",
                })}
                className="select w-full"
                defaultValue=""
                value={lesson.category}
              >
                <option value="" disabled>
                  Pick a Category
                </option>

                {categorys.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
            {/* Emotional Tone field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Emotional Tone</legend>
              <select
                {...register("emotionalTone", {
                  required: "Emotional Tone is Required",
                })}
                className="select w-full"
                defaultValue=""
                value={lesson.emotionalTone}
              >
                <option disabled value="">
                  Pick a Emotional Tone
                </option>
                {emotionalTones.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {errors.emotionalTone && (
              <p className="text-red-500">{errors.emotionalTone.message}</p>
            )}
            {/* Privacy field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Privacy</legend>
              <select
                {...register("privacy", { required: "Pick a Privacy" })}
                className="select w-full"
                defaultValue=""
                value={lesson.privacy}
              >
                <option disabled value="">
                  Pick a Privacy
                </option>
                {privacys.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {errors.privacy && (
              <p className="text-red-500">{errors.privacy.message}</p>
            )}
            {/* Access level Tone field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Access Level</legend>
              <select
                {...register("accessLevel", {
                  required: "Pick a Access Level",
                })}
                className="select w-full"
                defaultValue=""
                value={lesson.accessLevel}
              >
                <option disabled value="">
                  Pick a Access Level
                </option>
                {accessLevels.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {errors.accessLevel && (
              <p className="text-red-500">{errors.accessLevel.message}</p>
            )}
            <span className=""></span>
            <button
              className="btn btn-primary"
              onClick={handleSubmit(handleEdit)}
            >
              Edit Lesson
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default EditLesson;
