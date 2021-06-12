import React from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
// import { register_success } from "../redux/features/auth/auth";

const Login = () => {
  const count = useSelector((state) => state.auth.user);
  console.log(count);
  // const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    // dispatch(register_success());
  };
  return (
    <React.Fragment>
      <div className="mx-auto mt-8 border border-gray-200 card">
        <h1 className="pt-6 text-5xl text-center font-grand-hotel">
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
            onClick={loginHandler}
            className="w-3/4 py-1 mx-auto mt-4 text-white bg-blue-300 rounded-sm cursor-pointer hover:bg-instablue-default"
          />

          <div className="mt-4 text-center text-gray-500">OR</div>
          <div className="flex items-center justify-center mt-5 font-medium text-blue-900 text-md">
            <AiFillFacebook className="text-xl" />
            <Link to="/" className="text-center">
              Log in with Facebook
            </Link>
          </div>
          <div className="mt-3 text-sm text-center text-blue-900">
            <Link to="/">Forgot Password?</Link>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center mx-auto mt-3 text-sm border border-gray-200 smallcard">
        <span className="font-light ">Don't have an account?</span>
        <Link to="/signup" className="ml-2 text-blue-900">
          Signup
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Login;
