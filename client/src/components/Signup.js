import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { register_success } from "../redux/features/auth/auth";

const Signup = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setName(e.target.value);
  };

  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(register_success());
  };
  return (
    <React.Fragment>
      <div className="mx-auto mt-8 border border-gray-200 largecard">
        <h1 className="pt-6 text-5xl text-center font-grand-hotel">
          Instagram
        </h1>
        <h2 className="w-3/4 mx-auto mt-4 font-bold text-center text-gray-500 text-md">
          Sign up to see photos and videos from your friends.
        </h2>
        <div className="flex items-center justify-center w-3/4 py-1 mx-auto mt-5 font-medium text-white rounded-sm bg-instablue-default text-md">
          <AiFillFacebook className="text-xl" />
          <Link to="/" className="text-center">
            Log in with Facebook
          </Link>
        </div>
        <div className="mt-4 text-center text-gray-500">OR</div>
        <form action="" className="grid grid-cols-1 mt-4">
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email"
          />
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={changeHandler}
            className="form-control"
            placeholder="Name"
          />
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Password"
          />
          <input
            type="submit"
            value="Signup"
            onClick={signupHandler}
            className="w-3/4 py-1 mx-auto mt-4 text-white bg-blue-300 rounded-sm cursor-pointer hover:bg-instablue-default"
          />
          <span className="w-3/4 mx-auto mt-4 text-xs font-medium text-center text-gray-500">
            By signing up, you agree to our{" "}
            <strong> Terms , Data Policy and Cookies Policy .</strong>
          </span>
        </form>
      </div>
      <div className="flex items-center justify-center mx-auto mt-3 text-sm border border-gray-200 smallcard">
        <span>Have an account?</span>
        <Link to="/login" className="ml-2 text-blue-900">
          Login
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Signup;
