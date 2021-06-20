import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  followuser,
  getuserdetails,
  unfollowuser,
} from "../../redux/features/register/register";
import Loading from "../../utils/Loading";
import { useHistory } from "react-router";

const User = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [subscribed, setsubscribed] = useState(true);

  let parsedcurruser;
  let currname;
  useEffect(async () => {
    // setsubscribed(true)
    if (subscribed) {
       await dispatch(getuserdetails(props.match.params.id));
       const  stringifieduser = JSON.stringify(currentuser)
     parsedcurruser = JSON.parse(stringifieduser);
     currname = parsedcurruser.name;
    
    }
    return () => {
      setsubscribed(false);
    };
  }, []);

  const loading = useSelector((state) => state.auth.loading);
  // get targeted user details
  const userdetails = useSelector((state) => state.users.user);
  const loading2 = useSelector((state) => state.users.loading);
  // get current logged in users details
  const currentuser = useSelector((state) => state.auth.user);



  const { name, bio, username, followers, following, profilepic } = userdetails;

  // check if current user follows the targeted user or not
  const checkFollow = () => {
    let length = Object.keys(userdetails).length;
    if (length > 0) {
      if (
        userdetails.followers.filter((follower) => follower.name === currname)
          .length > 0
      ) {
        console.log(true);
        return true;
      } else {
        console.log(false);

        return false;
      }
    }
  };

  checkFollow();

  // follow unfollow handler function
  const followhandler = async () => {
    const data = {
      id: props.match.params.id,
      name: currname,
    };
    if (checkFollow()) {
      await dispatch(unfollowuser(data.id));
      history.go(0);
    } else {
      await dispatch(followuser(data));
      history.go(0);
    }
  };

  if (loading & loading2) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen">
        <div className="grid grid-cols-3 px-4 mt-10 sm:grid-cols-6 name_section md:items-start md:grid-cols-9 md:h-12">
          <div className="w-full col-start-1 col-end-2 image md:col-end-3">
            <img
              src={profilepic}
              alt=""
              className="w-20 h-20 rounded-full md:w-32 md:h-32"
            />
          </div>
          {/* edit and name */}

          <div className="col-span-2 col-end-4 edit sm:col-start-2 sm:col-end-7 md:flex md:items-center md:gap-6 md:col-start-3">
            <div className="text-xl name md:text-2xl"> {username}</div>
            <div className="flex items-center gap-4 mt-4 edit_profile md:mt-0">
              <button className="w-full border rounded-sm md:px-3 font-regular md:min-w-1/5 md:max-w-2/5">
                <Link to="/message"> Message</Link>
              </button>
              {checkFollow() === false ? (
                <button
                  onClick={followhandler}
                  className="w-full ml-1 text-white bg-blue-300 rounded-sm hover:bg-instablue-default md:px-3 font-regular md:min-w-1/5 md:max-w-2/5"
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={followhandler}
                  className="w-full ml-1 text-white rounded-sm hover:bg-blue-300 bg-instablue-default md:px-3 font-regular md:min-w-1/5 md:max-w-2/5"
                >
                  Unfollow
                </button>
              )}
            </div>
          </div>
        </div>

        {/* info section */}
        <div className="px-4 mt-4 xl:w-2/3 info_section md:ml-52 md:mt-0 lg:ml-52 lg:pl-6 xl:ml-64 xl:pl-8 2xl:ml-80 2xl:pl-6">
          <div className="name">
            <strong>{name}</strong>{" "}
          </div>
          <div className="about">{bio}</div>
        </div>

        {/* following and followers showcase */}
        <div className="flex items-center py-4 mt-6 text-center border-t border-b showcase_section md:hidden">
          <div className="w-1/3 posts">
            <strong> 30</strong>
            <br />
            posts
          </div>
          <div className="w-1/3 followers">
            <strong> {followers.length}</strong>
            <br />
            followers
          </div>
          <div className="w-1/3 following">
            <strong> {following.length}</strong>
            <br />
            following
          </div>
        </div>

        {/* images grid */}
        <div className="grid grid-cols-3 gap-1 mx-auto mt-8 images-section h-72 md:mt-32 md:h-80 md:grid-cols-4 ">
          {/* {userposts.map(({ image }) => {
          return (
            <div className="flex items-center justify-center md:w-56 img-compt h-72">
              <img src={image} alt="" className="h-72 md:h-80" key={image} />
            </div>
          );
        })} */}
        </div>
      </div>
    );
  }
};;

export default User;
