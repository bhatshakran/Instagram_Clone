import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcurrentuser } from "../../redux/features/auth/auth";
import { updateProfile, uploadProfilePic } from "../../redux/features/profile/profile";
import { useHistory } from "react-router-dom";
import imageCompression from "browser-image-compression";


const EditProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  useEffect(()=>{
      dispatch(getcurrentuser())
  }, [])
  const user = useSelector((state) => state.auth.user);
  
  
  

  const {
    name,
    phone,
    profilepic,
    email,
    username,
    website,
    bio,
    gender,
    _id,
  } = user;

  
  // state for input fields
  const [formdata, setformdata] = useState({});

  // state for errors

  const [errors, seterrors] = useState({})


//  state for image file
const [myfile, setMyfile] = useState(null);



// Image updation
const updateimagehandler = e =>{
  console.log(e.target.files)
  const imageFile = e.target.files[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    setMyfile(imageFile);
    
}


  

  

    // Change handler function
    const changeHandler = e => {
      setformdata({...formdata, [e.target.name]: e.target.value}) 
    }


    const validation =() =>{
      if(formdata.name === ''){
        errors['name'] = 'Name cannot be empty'
        seterrors({...errors})
      }else{
        errors['name'] = ''
        seterrors({...errors})
      }
      if(formdata.email === ''){
        errors['email'] = 'Email cannot be empty'
        seterrors({...errors})
      }else{
        errors['email'] = ''
        seterrors({...errors})
      }
    }


    // Submit handler function
    const submithandler = async () => {
      let profilepic;
      (async function () {
    
        
        if(myfile!== null){
        console.log('Compression started')
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
    let compressedFile ;
        try {
           compressedFile = await imageCompression(myfile, options);
        
          console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
          ); // true
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          );
     
        } catch (err) {
          console.log(err);
        }
        console.log("Compressed");
        console.log(compressedFile)
        // upload image to cloudinary
        const res =  await dispatch(uploadProfilePic(compressedFile));
         profilepic =  res.payload.secure_url;
        console.log('Uploaded to Cloudinary')
       
      }
         // input text fields  stuff from here
      let getdata = {
        name: formdata.name,
        email: formdata.email,
        username: formdata.username,
        bio: formdata.bio,
        website: formdata.website,
        gender: formdata.gender,
        phone: formdata.phone,
      };

      // handle validation
      validation();

      // before submitting check if name and email were not changed at all & set their values
      // to the default db value

      function setundefinedtovalue() {
        for (const field in getdata) {
          if (getdata[field] === undefined) {
            getdata = { ...getdata, [field]: user[field] };
          }
        }
      }
      if (errors.name === "" && errors.email === "") {
        setundefinedtovalue();
        getdata = { ...getdata, _id, profilepic };
        // console.log(getdata)
        await dispatch(updateProfile(getdata));
        history.push('/profile')
      } else {
        console.log("Cant proceed");
      }
  
       
      })();



     
    };







  return (
    <div className="min-h-screen pt-6 mt-8 border-t md:border-t-0 md:w-2/3 md:mx-auto">
      {/* image updation */}
      <div className="grid items-center grid-cols-9 image_editing ">
        <div className="col-start-1 col-end-3 px-3 ">
          <img src={profilepic} alt="" className="rounded-full w-14 h-14" />
        </div>
        <div className="col-start-3 col-end-11 sm:ml-0 name">
          <p className="text-lg"> shakran._.bhat</p>
          <input
            type="file"
            className="text-sm font-medium text-instablue-default"
            onChange={updateimagehandler}
          />
        </div>
      </div>
      <div className="w-3/4 ">
        {/* name updation */}
        <div className="grid items-center grid-cols-1 mx-4 mt-8 name_edit md:grid-cols-6">
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
            onChange={changeHandler}
            className="px-4 py-1 border md:col-start-2 md:col-end-7"
          />
          {errors.name && errors.name.length > 0 ? (
            <div className="text-xs text-red-500">{errors.name}</div>
          ) : (
            ""
          )}

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
        <div className="grid items-center grid-cols-1 mx-4 mt-8 name_edit md:grid-cols-6 md:gap-x-20">
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
            onChange={changeHandler}
            className="px-4 py-1 border md:col-start-2 md:col-end-7"
          />
          <p className="mt-4 leading-3 text-gray-500 md:col-start-1 md:col-end-7">
            <small>
              In most cases, you'll be able to change your username back to
              shakran._.bhat for another 14 days. Learn More
            </small>
          </p>
        </div>
        {/* website */}
        <div className="grid items-center grid-cols-1 mx-4 mt-8 name_edit md:grid-cols-6">
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
            onChange={changeHandler}
            className="px-4 py-1 border md:col-start-2 md:col-end-7"
          />
        </div>
        {/* Bio */}
        <div className="grid items-center grid-cols-1 mx-4 mt-8 name_edit md:grid-cols-6">
          <label
            htmlFor="bio"
            className="font-medium text-md md:col-start-1 md:col-end-2"
          >
            Bio
          </label>
          <textarea
            name="bio"
            defaultValue={bio}
            onChange={changeHandler}
            className="px-4 py-1 border md:col-start-2 md:col-end-7"
          ></textarea>
        </div>
        {/* Personal Information */}
        <div className="grid items-center grid-cols-1 mx-4 mt-8 name_edit">
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
        <div className="grid items-center grid-cols-1 gap-2 mx-4 mt-8 name_edit md:grid-cols-6 md:items-center">
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
            onChange={changeHandler}
            className="px-4 py-1 border md:col-start-2 md:col-end-7"
          />
          {errors.email && errors.email.length > 0 ? (
            <div className="text-xs text-red-500">{errors.email}</div>
          ) : (
            ""
          )}
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
            onChange={changeHandler}
            className="px-4 py-1 border md:h-2/3 md:col-start-2 md:col-end-7"
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
            onChange={changeHandler}
            className="px-4 py-1 capitalize border md:col-start-2 md:col-end-7"
          />
        </div>
        {/* Similar account suggestions */}
        <div className="mx-4 mt-8 mb-3 name_edit md:grid-cols-6">
          <button
            onClick={submithandler}
            className="px-3 py-1 text-sm font-medium text-white bg-blue-300 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
