import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogin } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-3 px-3.5 border-b border-gray-200">
      <div className="nav-brand text-3xl font-grand-hotel ">
        <Link to="/">Instagram</Link>
      </div>
      <ul className="nav-items flex items-center gap-4 ">
        <li className="nav-item cursor-pointer text-xl">
          <AiFillHome />
        </li>
        <li className="nav-item cursor-pointer text-xl">
          <AiOutlineLogin />
        </li>
        <li className="nav-item cursor-pointer text-xl">
          <CgProfile />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
