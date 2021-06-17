import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/features/Comments/comments";

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
      <div>
        {comments.comments.map((comment) => {
          console.log(comment);
        })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ViewComments;
