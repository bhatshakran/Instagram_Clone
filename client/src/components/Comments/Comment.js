import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/features/comments/comments";
import Loading from "../../utils/Loading";

const Comment = ({ name, text,p_id, id }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.comments.loading);

  const dispatch = useDispatch();

  const deleteCommt = () => {
    const data = {
      id: { p_id },
      comment_id: { id },
    };

    dispatch(deleteComment(data));
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen mb-16 ">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="flex items-start mx-2 mb-3 md:mx-8 md:my-10 md:mb-8 align-center">
        <h4 className="mr-3">
          <strong>{name}</strong>
        </h4>
        <div className="grid grid-cols-2 gap-0">
          <p>{text}</p>
          {name === user.name ? (
            <button
              onClick={deleteCommt}
              className="w-12 ml-4 text-white bg-blue-300 hover:bg-instablue-default"
            >
              <small>Delete</small>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
};

export default Comment;
