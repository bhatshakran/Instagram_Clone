import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../utils/hideAlert";
import AddpostForm from "../Forms/AddpostForm";
import Loading from "../../utils/Loading";
import { clearAlertMsg } from "../../redux/features/posts/posts";


const CreatePost = () => {
 const dispatch = useDispatch();
  const loading = useSelector(state => state.posts.loading)
  let alertRef = useRef(null)
  const alert = useSelector((state) => state.posts.alertMessage);
  console.log(loading)

  const clearstatemsg = () => {
    setTimeout(() => {
      dispatch(clearAlertMsg());
    }, 2000);
  };

  if(loading){
   return (
     <div className="flex items-center justify-center h-full ">
       <Loading />
     </div>
   );
  }else{
    return (
      <div className="h-screen ">
        <div className="mx-auto mt-8 border border-gray-200 card">
          {alert !== "" ? (
            <div
              ref={alertRef}
              className="py-4 text-center text-white bg-blue-300"
            >
              {alert} {hideAlert(alertRef)}
              {clearstatemsg()}
            </div>
          ) : (
            ""
          )}
          <AddpostForm />
        </div>
      </div>
    );
  }
  
};

export default CreatePost;
