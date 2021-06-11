import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaUserPlus, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-3 px-3.5 border-b border-gray-200">
      <div className="nav-brand text-3xl font-grand-hotel ">
        <Link to="/">Instagram</Link>
      </div>
      <ul className="nav-items flex items-center gap-4 ">
        <li className="nav-item cursor-pointer text-xl">
            <Link  to ='/'> <AiFillHome /></Link>
         
        </li>
        <li className="nav-item cursor-pointer text-xl">
         <Link to='/login'><RiLoginCircleFill /></Link> 
        </li>
        <li className="nav-item cursor-pointer text-xl">
          <Link to='/register'><FaUserPlus /></Link>
        </li>
        <li className="nav-item cursor-pointer text-xl">
         <Link to='/profile'> <FaUserCircle /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
