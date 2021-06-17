import React from "react";
import { useSelector } from "react-redux";

const Comment = ({ name, text, user }) => {
  const stuff = useSelector((state) => JSON.parse(state.auth.user));
  console.log(stuff);
  const uid = 1;
  console.log(uid);
  console.log(user);
  return (
    <div className="flex items-start mx-2 mb-3 md:mx-8 md:my-10 md:mb-8 align-center">
      <h4 className="mr-3">
        <strong>{name}</strong>
      </h4>
      <p>{text}</p>
      {name === stuff.name ? (
        <button className="px-3 ml-4 text-white bg-blue-300 hover:bg-instablue-default">
          Delete
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
