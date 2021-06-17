import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/features/Comments/comments";
import Comment from "./Comment";

const ViewComments = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const comments = useSelector((state) => state.comments.comments);

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch]);

  useEffect(() => {
    setData(comments);
  }, [comments]);

  if (data.length > 0) {
    return (
      <div className="h-screen md:max-w-xs md:mx-auto ">
        <div className="mt-3 md:border min-h-46">
          {comments.map((comment) => {
            return (
              <Comment
                name={comment.name}
                text={comment.text}
               
                p_id={id}
                id={comment._id}
                key={comment.text}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};;

export default ViewComments;
