import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getcurrentuser } from "../../redux/features/auth/auth";
import { getmyposts } from "../../redux/features/profile/profile";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getcurrentuser());
    dispatch(getmyposts());
  }, []);
  const user = useSelector((state) => state.auth.user);
  const userposts = useSelector((state) => state.profile.userposts);

  const { name, username, bio, profilepic } = user;

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
          <div className="mt-4 edit_profile md:mt-0 ">
            <button className="w-full border rounded-sm md:px-3 font-regular md:min-w-1/5 md:max-w-2/5">
              <Link to="/editprofile"> Edit Profile</Link>
            </button>
          </div>
        </div>
      </div>

      {/* following and followers showcase */}
      <div className="items-center hidden py-4 mt-6 text-center border-t border-b md:flex showcase_section md:w-1/3 md:ml-48 md:py-2 md:border-0 md:mt-2 md:mb-4 lg:pl-2 xl:ml-60 2xl:ml-72 2xl:pl-0">
        <div className="w-1/3 posts">
          <strong> 30</strong>
          <br />
          posts
        </div>
        <div className="w-1/3 followers">
          <strong> 65</strong>
          <br />
          followers
        </div>
        <div className="w-1/3 following">
          <strong> 61</strong>
          <br />
          following
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
          <strong> 65</strong>
          <br />
          followers
        </div>
        <div className="w-1/3 following">
          <strong> 61</strong>
          <br />
          following
        </div>
      </div>

      {/* images grid */}
      <div className="grid grid-cols-3 gap-1 mx-auto mt-8 images-section h-72 md:mt-32 md:h-80 md:grid-cols-4 ">
        {userposts.map(({ image }) => {
          return (
            <div className="flex items-center justify-center md:w-56 img-compt h-72">
              <img src={image} alt="" className="h-72 md:h-80" key={image} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
