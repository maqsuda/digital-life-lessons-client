import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
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
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password field */}
          <label className="label text-white">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer{" "}
            </p>
          )}

          <div>
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
