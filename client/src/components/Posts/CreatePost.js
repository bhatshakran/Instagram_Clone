import React from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import AddpostForm from "../Forms/AddpostForm";

const CreatePost = () => {
  const alert = useSelector((state) => state.posts.alertMessage);
  console.log(alert);
  return (
    <div className="h-screen ">     
      <div className="mx-auto mt-8 border border-gray-200 card">
      {alert !== "" ? (
        <div className="py-4 text-center text-white bg-yellow-300">
          {alert}.{" "}
          <Link to='/' className='text-white'>View Posts</Link>
          </div>
      ) : (
        ""
      )}
        <AddpostForm />
      </div>
    </div>
  );
};

export default CreatePost;
