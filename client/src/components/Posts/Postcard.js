import React, { useState, useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../redux/features/posts/posts";

const Postcard = ({ image, name, title, body, postid, likes }) => {
  const currentUserID = useSelector((state) => state.posts.user.id)

  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false)
  
  // Hover Event Listener
  const hoverFunc = () => {
    setHovered(true);
  };

  // Unhover Event Listener
  const unhoverFunc = () => {
    setHovered(false);
  };
  

  // Like/Unlike Event Listener
  const likeUnlikeFunc = () => {
   
    
      const likedByMe =  likes.filter(like => like.user === currentUserID);
     
      if(likedByMe.length >=1){
        console.log('unliking now')
        const data ={
          id:postid,
          type:'unlike'
        }
        dispatch(likePost(data))
        setLiked(true);
      }else{
        setLiked(true)
        console.log('liking this post now')
        const data ={
          id:postid,
          type:'like'
        }
        dispatch(likePost(data));
      }
  
  };

  useEffect(()=>{
    console.log('refreshing page')
  }, [liked])

  return (
    <div className="pb-4 mb-4 border border-gray-200 rounded-sm shadow-sm postcard">
      <div className="px-16 pt-1 border-b top">
        <h4>
          <strong>{name}</strong>
        </h4>
        <h5>
          <small>{title}</small>
        </h5>
      </div>
      <div className="medium">
        <img src={image} alt="" className="mx-auto my-2 fill" />
      </div>
      <div className="pt-2 maincontainer">
        <div className="flex items-center ml-3 icons">
          {/* like icon */}
          <div
            className="cursor-pointer heart"
            onMouseOver={hoverFunc}
            onMouseLeave={unhoverFunc}
            onClick={likeUnlikeFunc}
          >
            {hovered ? (
              // filled heart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="red"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // hollow heart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </div>
          {/* comment icon */}
          <div className="comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          {/* share icon */}
          <div className="share">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-send"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-6 ml-3 text-sm">
          <strong>{name}</strong>
          <p>{body}</p>
        </div>
        {/* comments */}
        <div className="ml-4 text-gray-500 ">View all comments</div>
        <div>
          <div className="flex items-center gap-1 ml-4 text-sm name">
            <strong>v.lee87</strong>
            <p>Cool pic</p>
          </div>
          <div className="flex items-center gap-1 ml-4 text-sm name">
            <strong>ra_one1</strong>
            <p>Maddd!!!!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postcard;
