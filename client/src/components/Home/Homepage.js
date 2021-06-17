import React, { useEffect } from "react";
import Postcard from "../Posts/Postcard";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/features/posts/posts";
import Loading from "../../utils/Loading";

const Homepage = () => {
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  if(loading){
return <div className="flex items-center justify-center h-screen ">
            <Loading />
        </div>
  }else{
  return (
    <div className="mx-auto mt-5 maincontainer">
      {Object.values(posts).map((post) => {
        return (
          <Postcard
            image={post.image}
            name={post.name}
            body={post.body}
            title={post.title}
            postid={post._id}
            lykes={post.likes}
            key={post._id}
          />
        );
      })}
    </div>
  )
    }
};

export default Homepage;
