import React from "react";
import AddpostForm from "../Forms/AddpostForm";

const CreatePost = () => {
  return (
    <div className='h-screen '>
    <div className="mx-auto mt-8 border border-gray-200 card">
      <AddpostForm />
    </div>
    </div>
  );
};

export default CreatePost;
