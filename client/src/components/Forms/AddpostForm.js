import React from "react";
import { useFormik } from "formik";

const AddpostForm = () => {
  // validate the add post form
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.body) {
      errors.body = "Caption is required";
    }

    if (!values.file) {
      errors.file = "Please upload a pic";
    }

    return errors;
  };

  const onSubmit = (values) => {
    console.log(JSON.stringify(values));
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
          onChange={formik.handleChange}
          value={formik.values.file}
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
