import React from "react";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";

const Bottombar = () => {
  return (
    <div className="sticky bottom-0 flex items-center justify-center object-bottom w-full h-12 bg-white border-t ">
      <Link to="/add_post" className="text-3xl">
        <IoIosAddCircleOutline />
      </Link>
    </div>
  );
};

export default Bottombar;
