import React from "react";
import { useSelector } from "react-redux";


const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const parseduser = JSON.parse(user);

  const { name, phone, profilepic,email, username, website, bio, gender } =
    parseduser;
  return (
    <div className="min-h-screen pt-6 mt-8 border-t md:border-t-0 md:w-2/3 md:mx-auto">
      {/* image updation */}
      <div className="grid items-center grid-cols-9 image_editing ">
        <div className="px-3 image">
          <img src={profilepic} alt="" className="w-10 h-10 rounded-full" />
        </div>
        <div className="col-start-2 col-end-11 name">
          <p className="text-lg"> shakran._.bhat</p>
          <button className="text-sm font-medium text-instablue-default">
            Change Profile Picture
          </button>
        </div>
      </div>
      <div className="w-3/4 ">
        {/* name updation */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit md:grid-cols-6">
          <label
            htmlFor="name"
            className="font-medium text-md md:col-start-1 md:col-end-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={name}
            className="py-1 border md:col-start-2 md:col-end-7"
          />

          <p className="mt-4 leading-3 text-gray-500 md:col-start-1 md:col-end-7">
            <small>
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name.
              <br />
              You can only change your name twice within 14 days.
            </small>
          </p>
        </div>
        {/* username updation */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit md:grid-cols-6 md:gap-x-20">
          <label
            htmlFor="username"
            className="font-medium text-md md:col-start-1 md:col-end-2"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            defaultValue={username}
            className="py-1 border md:col-start-2 md:col-end-7"
          />
          <p className="mt-4 leading-3 text-gray-500 md:col-start-1 md:col-end-7">
            <small>
              In most cases, you'll be able to change your username back to
              shakran._.bhat for another 14 days. Learn More
            </small>
          </p>
        </div>
        {/* website */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit md:grid-cols-6">
          <label
            htmlFor="webiste"
            className="font-medium text-md md:col-start-1 md:col-end-2"
          >
            Website
          </label>
          <input
            type="text"
            name="website"
            defaultValue={website}
            className="py-1 border md:col-start-2 md:col-end-7"
          />
        </div>
        {/* Bio */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit md:grid-cols-6">
          <label
            htmlFor="bio"
            className="font-medium text-md md:col-start-1 md:col-end-2"
          >
            Bio
          </label>
          <textarea
            name="bio"
            defaultValue={bio}
            className="py-1 border md:col-start-2 md:col-end-7"
          >
          </textarea>
        </div>
        {/* Personal Information */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit">
          <h3 className="text-gray-500 ">Personal Information</h3>
          <p className="mt-2 leading-3 text-gray-500 md:col-start-1 md:col-end-7">
            <small>
              Provide your personal information, even if the account is used for
              a business, a pet or something else. This won't be a part of your
              public profile.
            </small>
          </p>
        </div>
        {/* Email and phone number*/}
        <div className="grid grid-cols-1 gap-2 mx-4 mt-8 name_edit md:grid-cols-6 md:items-center">
          <label
            htmlFor="email"
            className="font-medium text-md md:col-start-1 md:col-end-2"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            defaultValue={email}
            className="py-1 border md:col-start-2 md:col-end-7"
          />

          <label
            htmlFor="phone"
            className="mt-3 font-medium text-md md:col-start-1 md:col-end-2"
          >
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            defaultValue={phone}
            className="py-1 border md:h-2/3 md:col-start-2 md:col-end-7"
          />

          <label
            htmlFor="gender"
            className="mt-3 font-medium text-md md:col-start-1 md:col-end-2"
          >
            Gender
          </label>
          <input
            type="text"
            name="gender"
            defaultValue={gender}
            className="py-1 border md:col-start-2 md:col-end-7"
          />
        </div>
        {/* Similar account suggestions */}
        <div className="mx-4 mt-8 mb-3 name_edit md:grid-cols-6">
          <button className="px-3 py-1 text-sm font-medium text-white bg-blue-300 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
