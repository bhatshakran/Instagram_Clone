import React from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";

const Login = () => {
  return (
    <React.Fragment>
      <div className="mx-auto mt-8 card  border card border-gray-200">
        <h1 className="pt-6 font-grand-hotel text-5xl text-center">
          Instagram
        </h1>
        <form action="" className="grid grid-cols-1 mt-4">
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email"
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
            value="Login"
            className="cursor-pointer mx-auto mt-4 bg-blue-300 text-white w-3/4 py-1 rounded-sm hover:bg-blue-600"
          />

          <div className="mt-4 text-center text-gray-500">OR</div>
          <div className="  font-medium mt-5 text-md flex items-center justify-center text-blue-900">
            <AiFillFacebook className="text-xl" />
            <Link to="/" className="text-center">
              Log in with Facebook
            </Link>
          </div>
          <div className="text-sm text-center mt-3 text-blue-900">
            <Link to="/">Forgot Password?</Link>
          </div>
        </form>
      </div>
      <div className="border border-gray-200 mt-3 smallcard mx-auto flex items-center text-sm justify-center">
        <span className="font-light ">Don't have an account?</span>
        <Link to="/" className="text-blue-900 ml-2">
          Signup
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Login;
