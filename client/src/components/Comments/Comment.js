import React from "react";

const Comment = ({ name, text }) => {
  return (
    <div className="flex items-start mx-2 mb-3 sm:mx-8 sm:my-10 sm:mb-8 align-center">
      <h4 className="mr-3">
        <strong>{name}</strong>
      </h4>
      <p>{text}</p>
    </div>
  );
};

export default Comment;
