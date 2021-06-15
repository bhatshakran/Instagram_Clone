import React, { useRef, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikesById, likePost } from "../../redux/features/posts/posts";


const Postcard = ({ image, name, title, body, postid }) => {
  const[postlikes, setpostlikes] = useState()
  const currentUserID = useSelector((state) => state.posts.user.id)
  const dispatch = useDispatch();
  const heartRef= useRef()






 
//  check if i have liked the post or not
const checkIfILiked = async () =>{
 const likes =  await getPostLikes()
 const myLike =  likes.filter(like => like.user === currentUserID);
 return {likes,myLike};
 
}

// get post likes 
const getPostLikes = async() =>{
  const res = await dispatch(getLikesById(postid))
  const likes = res.payload;
  setpostlikes(likes.length)
  return likes;

}







  

  // Like/Unlike Event Listener
  const likeUnlikePost = () => {
    (async function(){
     let {myLike,likes} = await checkIfILiked();
     
    
    if(myLike.length === 0){
      console.log("liking this post now");
      const data = {
        id: postid,
        type: "like",
      };
     await dispatch(likePost(data));
      
      heartRef.current.classList.remove('hollow')
      heartRef.current.classList.add('filled')
      setpostlikes(likes.length + 1);
      

    
  
    
    }else{
      console.log("unliking now");
      const data = {
        id: postid,
        type: "unlike",
      };
       await dispatch(likePost(data));
       heartRef.current.classList.remove('filled')
       heartRef.current.classList.add('hollow')
       setpostlikes(likes.length - 1);
 

    }

    })()
    
     
        
  };


  // display heart icon
  const displayHeart = async () =>{
    const {myLike} = await checkIfILiked();

    if(myLike.length >= 1){
      heartRef.current.classList.remove('hollow')
      heartRef.current.classList.add('filled')
    }else{
      heartRef.current.classList.remove('filled')
      heartRef.current.classList.add('hollow')

    }
  }

  displayHeart()


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
        <div className="flex items-center gap-1 ml-3 icons">
          {/* like icon */}
          <div
            className="cursor-pointer "
            
            onClick={likeUnlikePost}
          >
    
            <div ref={heartRef} className="w-6 h-6"></div>
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
        {/* view likes */}
       <div className='mt-2 ml-3 text-sm font-medium'>
       Liked by{' '}{postlikes}{' '}people
       </div> 
        <div className="flex items-center gap-2 mt-3 ml-3 text-sm">
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
  )}


export default Postcard;
