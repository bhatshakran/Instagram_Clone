import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/features/Comments/comments";

const Comment = ({ name, text,p_id, id }) => {
  const stuff = useSelector((state) => JSON.parse(state.auth.user));
  const dispatch = useDispatch()

  const deleteCommt = () => {
   const data = {
     id:{p_id},
     comment_id:{id}
   }
  //  console.log(data)
   dispatch(deleteComment(data))
   
  }

  return (
    <div className="flex items-start mx-2 mb-3 md:mx-8 md:my-10 md:mb-8 align-center">
      <h4 className="mr-3">
        <strong>{name}</strong>
      </h4>
      <div className='grid grid-cols-2 gap-0'>
       <p>{text}</p> 
      {name === stuff.name ? (
        <button 
        onClick={deleteCommt}
        className="w-12 ml-4 text-white bg-blue-300 hover:bg-instablue-default">
          <small>
          Delete
          </small>
       
        </button>
      ) : (
        ""
      )}
      </div>
      
    </div>
  );
};

export default Comment;
