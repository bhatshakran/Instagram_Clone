import React from "react";
import emo from "../../images/emo.jpeg";
import gyal from "../../images/gyal.jpeg";
import shore from "../../images/shore.jpeg";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-3 px-4 mt-10 sm:grid-cols-6 name_section">
        <div className="w-full col-start-1 col-end-2 image">
          <img src={shore} alt="" className="w-20 h-20 rounded-full" />
        </div>
        <div className="col-span-2 col-end-4 edit sm:col-start-2 sm:col-end-7">
          <div className="text-xl name"> shakran._.bhat</div>
          <div className="mt-4 edit_profile">
            <button className="w-full border rounded-sm font-regular">
              <Link to="/editprofile"> Edit Profile</Link>
            </button>
          </div>
        </div>
      </div>

      {/* info section */}
      <div className="px-4 mt-4 info_section">
        <div className="name">
          <strong>Shaqran</strong>{" "}
        </div>
        <div className="about">
          Knock, & He'll open the door
          <br />
          Vanish, & He'll make u shine like the sun
          <br />
          Fall, & He'll raise u 2 the heavens
          <br />
          Bcome nothin, & He'll turn u into everythin
        </div>
      </div>

      {/* following and followers showcase */}
      <div className="flex items-center py-4 mt-6 text-center border-t border-b showcase_section">
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
      <div className="grid grid-cols-3 gap-1 images-section">
        <div className="img-compt">
          <img src={emo} alt="" />
        </div>
        <div className="img-compt">
          <img src={gyal} alt="" />
        </div>
        <div className="img-compt">
          <img src={shore} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
