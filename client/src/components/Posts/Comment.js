import React, {  useRef, useState } from "react";
import { EmojiButton } from '@joeattardi/emoji-button';
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/features/Comments/comments";

const Comment = ({ postid }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);
  const emobutton = useRef(null);
  const input = useRef();

  const picker = new EmojiButton();

  picker.on("emoji", (emoji) => {
    const data = [...text, emoji.emoji];
    const styledData = data.toString().replace(/,/g, "");
    setText(styledData);
  });

  const emohandler = () => {
    picker.pickerVisible
      ? picker.hidePicker()
      : picker.showPicker(emobutton.current);
  };

  const changeHandler = (e) => {
    if (text.length === 0) {
      setErrors("No text. Please write something!");
    } else setErrors("");
    setText(e.target.value);
  };

  const submitHandler = () => {
    if (text.length === 0) {
      console.log("cannot post");
    } else {
      console.log("posting");
      const data =  {
        id:{postid},
        comment:{text},
      };
      dispatch(createComment(data));
    }
  };

  const alert = () => {
    return <div className="text-xs text-red-400">{errors}</div>;
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-start gap-0 mt-3 border-t h-18">
        <div className="w-10 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ref={emobutton}
            onClick={emohandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <input
          placeholder="Add a comment..."
          onChange={changeHandler}
          value={text}
          type="text"
          ref={input}
          className="w-full h-12 mr-1 focus:outline-none"
        />
        <button
          onClick={submitHandler}
          className="mr-3 text-blue-300 focus:outline-none hover:text-blue-500"
        >
          Post
        </button>
      </div>
      {errors.length !== 0 ? alert() : ""}
    </React.Fragment>
  );
};

export default Comment;
