import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/features/Comments/comments";
import Comment from "./Comment";

const ViewComments = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const comments = useSelector((state) => state.comments);

  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await dispatch(getComments(id));
    setData(res.payload);
  }, []);

  if (data.length > 0) {
    return (
      <div className="h-screen max-w-xs mx-auto ">
         <div className='border min-h-46'>
        {comments.comments.map((comment) => {
   
         console.log(comment);
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
};

export default ViewComments;
