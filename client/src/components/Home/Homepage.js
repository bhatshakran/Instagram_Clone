import React, { useEffect } from "react";
import Postcard from "../Posts/Postcard";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/features/posts/posts";

const Homepage = () => {

  const posts = useSelector((state) => state.posts.posts);
  console.log(Object.values(posts));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);


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
  );
};

export default Homepage;
