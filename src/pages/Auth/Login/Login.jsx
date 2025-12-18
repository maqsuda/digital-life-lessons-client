import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const axiosSecure = useAxiosSecure();

  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("form data", data);
    // const email = emailRef.current.value;
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        //for verification

        // if (!result.user.emailVerified) {
        //   alert("Please verify your email address");
        // }

        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    console.log("Email ref ", email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch();
  };

  return (
    <div className="w-full mx-auto max-w-sm shrink-0 pt-10  min-h-screen bg-opacity-20">
      <form
        className="card-body backdrop-blur-xl bg-white/10 border border-white/20 
                shadow-2xl pt-10 rounded-2xl "
        onSubmit={handleSubmit(handleLogin)}
      >
        <h3 className="text-3xl text-center text-secondary">
          Digital Life Lessons
        </h3>

        <p className="text-center text-white font-bold">Please Login</p>
        <fieldset className="fieldset">
          {/* email field */}
          <label className="label text-white">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            ref={(el) => {
              register("email").ref(el); // RHF ref
              emailRef.current = el; // your ref
            }}
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          <div className="relative">
            {/* password field */}
            <label className="label text-white">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
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
              className="btn btn-xs absolute top-7 right-4 bg-white border-none text-lg font-bold"
            >
              {showPassword ? <FaEye /> : <LuEyeClosed />}
            </button>
          </div>

          <div onClick={handleForgetPassword}>
            <a className="link link-hover text-white">Forgot password?</a>
          </div>
          <button className="btn text-white bg-primary border-0 mt-4 hover:text-secondary hover:underline hover:cursor-pointer">
            Login
          </button>
        </fieldset>
        <p className="font-bold">
          <span className="text-white">New to </span>
          <Link
            state={location.state}
            className="text-secondary hover:underline hover:cursor-pointer "
            to="/register"
          >
            Register
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Login;
