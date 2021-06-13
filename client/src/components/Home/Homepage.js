import React, { useEffect } from "react";
import Postcard from "../Posts/Postcard";
import {useDispatch} from 'react-redux'
import { getAllPosts } from "../../redux/features/posts/posts";

const Homepage = () => {
  const dispatch = useDispatch()
  
  useEffect(()=> {
    dispatch(getAllPosts())
  }, [])
  return (
    <div className="mx-auto mt-5 maincontainer">
      <Postcard />
    </div>
  );
};

export default Homepage;
