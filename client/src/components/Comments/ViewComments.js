import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/features/Comments/comments";
import Comment from "./Comment";
import Loading from "../../utils/Loading";

const ViewComments = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const commt = useSelector((state) => state.comments);
  const comments = commt.comments;
  const loading = commt.loading;

  const [, setData] = useState([]);

  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch]);

  useEffect(() => {
    window.scroll(0, 0);
    setData(comments);
  }, [comments]);

  if (!loading) {
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
    return ( <div className="flex items-center justify-center h-screen ">
            <Loading />
        </div>
  
    );
  }
};;

export default ViewComments;
