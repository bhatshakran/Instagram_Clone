import React, { useState } from "react";
import { useFormik } from "formik";
import { createPost, uploadPic } from "../../redux/features/posts/posts";
import { useDispatch } from "react-redux";

const AddpostForm = () => {
  const [myfile, setMyfile] = useState([]);
    const dispatch = useDispatch();
  // validate the add post form
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.body) {
      errors.body = "Caption is required";
    }

    // validate file
    if(myfile.length === 0){
      errors.file = 'Please select a pic'
    }
    

    return errors;
  };

  const onSubmit = (values) => {
   
    (async function () {
      console.log("submitted");
      // upload file to cloudinary
     const res =  await dispatch(uploadPic( myfile));
     const link = res.payload.url;
    //  create post, send post request to backend
    const {title, body} = values;
    const allData ={
      title, body, link

    }
     dispatch(createPost(allData));
    })();
    
   

   
  };

  const fileHandler = (e) => {
    setMyfile(e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      file: "",
      title: "",
      body: "",
    },
    validate,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="pt-6 text-5xl text-center font-grand-hotel">New Post</h1>
      <div className="text-center">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter a title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="form-control"
        />
        {formik.errors.title ? (
          <div className="w-2/3 mx-auto text-xs text-left text-red-600">
            {formik.errors.title}
          </div>
        ) : null}
        <input
          type="text"
          name="body"
          id="body"
          placeholder="Enter a caption"
          onChange={formik.handleChange}
          value={formik.values.body}
          className="form-control"
        />
        {formik.errors.body ? (
          <div className="w-2/3 mx-auto text-xs text-left text-red-600">
            {formik.errors.body}
          </div>
        ) : null}
        <input
          type="file"
          name="file"
          id="file"
          onChange={fileHandler}     
          className="form-control"
        />
        {formik.errors.file ? (
          <div className="w-2/3 mx-auto text-xs text-left text-red-600">
            {formik.errors.file}
          </div>
        ) : null}

        <button
          type="submit"
          className="w-3/4 py-1 mx-auto mt-4 text-white bg-blue-300 rounded-sm cursor-pointer hover:bg-instablue-default"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default AddpostForm;
