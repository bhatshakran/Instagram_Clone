import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import {  hideAlert } from "../../utils/hideAlert";
import AddpostForm from "../Forms/AddpostForm";

const CreatePost = () => {
  let alertRef = useRef(null)
  const alert = useSelector((state) => state.posts.alertMessage);
  console.log(alert);

  
  return (
    <div className="h-screen ">     
      <div className="mx-auto mt-8 border border-gray-200 card">
      {alert !== "" ? (
        <div ref={alertRef} className="py-4 text-center text-white bg-blue-300">
          {alert}{' '}
          {hideAlert(alertRef)} 
          <Link to='/' className='text-black '>View Posts</Link>
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
