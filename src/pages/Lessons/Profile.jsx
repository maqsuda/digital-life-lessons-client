import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");

  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    // watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const test = watch("displayName");

  const axiosSecure = useAxiosSecure();

  const { isLoading, data: userInfo } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    setDisplayName(user.displayName);
  }, [user]);

  const handleProfileUpdate = (data) => {
    const profileImg = data.photo[0];

    const formData = new FormData();
    formData.append("image", profileImg);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    axios.post(image_API_URL, formData).then((res) => {
      const photoURL = res.data.data.url;

      const userInfo = {
        displayName: data.displayName,
        photoURL: photoURL,
      };

      axiosSecure
        .patch(`/users/${user.email}`, userInfo)
        .then((res) => console.log(res.data));

      const userProfile = {
        displayName: data.displayName,
        photoURL: photoURL,
      };

      updateUserProfile(userProfile)
        .then(() => {
          console.log("profile updated.", userProfile);
          navigate(location.state || "/");
        })
        .catch((error) => console.log(error));
    });
  };

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="w-1/2 mx-auto text-black ">
      <h2 className="text-2xl font-bold underline text-center py-5">Profile</h2>

      <form className="card-body" onSubmit={handleSubmit(handleProfileUpdate)}>
        <fieldset className="fieldset">
          <div className="grid grid-cols-2 gap-2 ">
            <div className="items-center justify-center pt-12 pl-10">
              <div className="ml-5">
                {/* photo image field */}
                <div>
                  <img
                    className="size-16 rounded-full border"
                    src={userInfo.photoURL}
                  ></img>
                </div>
              </div>
              <div className="">
                {/* email field */}
                <label className="label font-bold">{userInfo.email}</label>
              </div>
            </div>

            <div className="gap-2">
              <div>
                {" "}
                {/* name field */}
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("displayName", { required: true })}
                  className="input "
                  placeholder="Your Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Name is required.</p>
                )}
              </div>
              <div className="pt-5">
                {/* photo image field */}
                <label className="label">Photo</label>

                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input"
                  placeholder="Your Photo"
                />

                {errors.name?.type === "required" && (
                  <p className="text-red-500">Photo is required.</p>
                )}
              </div>

              <div className="pt-5">
                {/* Access Level field */}
                <label className="label">Access Level</label>
                <input
                  type="text"
                  {...register("accessLevel", { required: true })}
                  className="input"
                  placeholder="Your Name"
                  value={userInfo.accessLevel}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Access Level is required.</p>
                )}
              </div>
            </div>
          </div>
          <button className="btn bg-primary mt-4 text-white font-bold hover:text-secondary hover:cursor-pointer border-0">
            Update User
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Profile;
