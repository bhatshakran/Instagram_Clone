import React from "react";
import shore from "../../images/shore.jpeg";

const EditProfile = () => {
  return (
    <div className="min-h-screen pt-6 mt-8 border-t">
      {/* image updation */}
      <div className="grid items-center grid-cols-9 image_editing">
        <div className="px-3 image">
          <img src={shore} alt="" className="w-10 h-10 rounded-full" />
        </div>
        <div className="col-start-2 col-end-11 name">
          <p className="text-lg"> shakran._.bhat</p>
          <button className="text-sm font-medium text-instablue-default">
            Change Profile Picture
          </button>
        </div>
      </div>
      <div className="max-w-sm">
        {/* name updation */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit">
          <label htmlFor="name" className="font-medium text-md">
            Name
          </label>
          <input type="text" name="name" id="" className="py-1 border" />
          <p className="mt-4 leading-3 text-gray-500">
            <small>
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name.
              <br />
              You can only change your name twice within 14 days.
            </small>
          </p>
        </div>
        {/* username updation */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit">
          <label htmlFor="username" className="font-medium text-md">
            Username
          </label>
          <input type="text" name="username" id="" className="py-1 border" />
          <p className="mt-4 leading-3 text-gray-500">
            <small>
              In most cases, you'll be able to change your username back to
              shakran._.bhat for another 14 days. Learn More
            </small>
          </p>
        </div>
        {/* website */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit">
          <label htmlFor="webiste" className="font-medium text-md">
            Website
          </label>
          <input type="text" name="website" id="" className="py-1 border" />
        </div>
        {/* Bio */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit">
          <label htmlFor="bio" className="font-medium text-md">
            Bio
          </label>
          <textarea name="bio" id="" className="py-1 border"></textarea>
        </div>
        {/* Personal Information */}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit">
          <h3 className="text-gray-500 ">Personal Information</h3>
          <p className="mt-2 leading-3 text-gray-500">
            <small>
              Provide your personal information, even if the account is used for
              a business, a pet or something else. This won't be a part of your
              public profile.
            </small>
          </p>
        </div>
        {/* Email and phone number*/}
        <div className="grid grid-cols-1 mx-4 mt-8 name_edit">
          <label htmlFor="email" className="font-medium text-md">
            Email
          </label>
          <input type="text" name="email" id="" className="py-1 border" />

          <label htmlFor="phone" className="mt-3 font-medium text-md">
            Phone Number
          </label>

          <input type="text" name="phone" id="" className="py-1 border" />

          <label htmlFor="gender" className="mt-3 font-medium text-md">
            Gender
          </label>
          <input type="text" name="gender" id="" className="py-1 border" />
        </div>
        {/* Similar account suggestions */}
        <div className="mx-4 mt-8 mb-3 name_edit">
          <button className="px-3 py-1 text-sm font-medium text-white bg-blue-300 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
