import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Logo from "../../logo/Logo";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { sendEmailVerification } from "firebase/auth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { registerUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    // console.log("after register", data.photo[0]);
    const profileImg = data.photo[0];

    data.accessLevel = "Free";
    data.price = 0;

    registerUser(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          // console.log("after image upload", res.data.data.url);
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
            accessLevel: data.accessLevel,
            price: data.price,
          };

          axiosSecure
            .post("/users", userInfo)
            .then((res) => console.log(res.data));

          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then(() => {
              console.log("profile updated.", userProfile);
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });

        sendEmailVerification(result.user).then(() => {
          alert("Please verify your email");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="  w-full mx-auto max-w-sm shrink-0 pt-10 shadow-xl  min-h-screen bg-opacity-20 ">
      <div className="flex justify-between gap-10">
        <div
          className="backdrop-blur-xl bg-white/10 border border-white/20 
                shadow-2xl rounded-2xl "
        >
          <h3 className="text-3xl text-center text-secondary">
            Welcome to <br></br> Digital Life Lessons
          </h3>
          <p className="text-center text-white font-bold pt-5">
            Please Register
          </p>
          <form
            className="card-body"
            onSubmit={handleSubmit(handleRegistration)}
          >
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

              {/* photo image field */}
              <label className="label text-white">Photo</label>

              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="Your Photo"
              />

              {errors.name?.type === "required" && (
                <p className="text-red-500">Photo is required.</p>
              )}

              {/* email field */}
              <label className="label text-white">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required.</p>
              )}

              <div className="relative">
                {/* password */}
                <label className="label text-white">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                  className="input"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required.</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be 6 characters or longer
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must have at least one uppercase, at least one
                    lowercase, at least one number, and at least one special
                    characters
                  </p>
                )}
                <button
                  onClick={handleShowPassword}
                  className="btn btn-xs absolute top-7 right-0 bg-white border-none text-lg font-bold"
                >
                  {showPassword ? <FaEye /> : <LuEyeClosed />}
                </button>
              </div>

              <div>
                <a className="link link-hover text-white hover:text-secondary">
                  Forgot password?
                </a>
              </div>
              <button className="btn bg-primary mt-4 text-white font-bold hover:text-secondary hover:cursor-pointer border-0">
                Register
              </button>
            </fieldset>
            <p className="text-white">
              Already have an account{" "}
              <Link
                state={location.state}
                className="text-secondary hover:underline font-bold"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
        {/* <div>
          <img src={img} alt="" className="bg-transparent" />
        </div> */}
      </div>
    </div>
  );
};

export default Register;
