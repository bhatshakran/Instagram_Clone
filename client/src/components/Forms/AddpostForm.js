import React, { useState } from "react";
import { useFormik } from "formik";
import { createPost, uploadPic } from "../../redux/features/posts/posts";
import { useDispatch } from "react-redux";
import imageCompression from "browser-image-compression";

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
    if (myfile.length === 0) {
      errors.file = "Please select a pic";
    }

    return errors;
  };

  const onSubmit = (values) => {
    (async function () {
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
      const res = await dispatch(uploadPic(compressedFile));
      const link = res.payload.secure_url;
      console.log('Uploaded to Cloudinary')
      //  create post, send post request to backend
      const { title, body } = values;
      const allData = {
        title,
        body,
        link,
      };
      dispatch(createPost(allData));
    })();
  };

  // image handler function
  const fileHandler = async (e) => {
    const imageFile = e.target.files[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    setMyfile(imageFile);

   
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
          accept="image/*"
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
