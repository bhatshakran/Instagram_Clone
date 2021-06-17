import React from "react";
import { useSelector } from "react-redux";

const Comment = ({ name, text, user }) => {
  const uid = useSelector(state => state.posts.user._id)
  return (
    <div className="flex items-start mx-2 mb-3 sm:mx-8 sm:my-10 sm:mb-8 align-center">
      <h4 className="mr-3">
        <strong>{name}</strong>
      </h4>
      <p>{text}</p>
      {uid === user ? <button className= 'px-3 ml-4 text-white bg-blue-300 hover:bg-instablue-default'>Delete</button>:''}
    </div>
  );
};

export default Comment;
