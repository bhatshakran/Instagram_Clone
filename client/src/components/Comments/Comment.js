import React from "react";

const Comment = ({ name, text }) => {
  return (
    <div className="flex items-center mx-8 my-10 mb-8 align-center">
      <h4>
        <strong>{name}</strong>
      </h4>
      <p>{text}</p>
    </div>
  );
};

export default Comment;
