import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/features/Comments/comments";
import Comment from "./Comment";

const ViewComments = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const comments = useSelector((state) => state.comments.comments);

  const [data, setData] = useState([]);
  // console.log(data);
  // console.log(id);
  useEffect(() => {
    dispatch(getComments(id));
   
  }, [dispatch]);

  useEffect(()  =>  {
    setData(comments);
  }, [comments]);

  console.log(data);;

  if (data.length > 0) {
    return (
      <div className="h-screen max-w-xs md:mx-auto ">
        <div className="md:border min-h-46">
          {comments.map((comment) => {
            console.log(comment)
            return (
              <Comment
                name={comment.name}
                text={comment.text}
                user={comment.user}
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
