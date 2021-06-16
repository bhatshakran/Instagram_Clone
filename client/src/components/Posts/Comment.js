import React, { useRef, useState } from "react";
import Picker from "emoji-picker-react";

const Comment = () => {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const keyboard = useRef(null);
  const [state, setState] = useState(false);

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
    }
  };
  const onEmojiClick = (event, emojiObject) => {
    setText(emojiObject);
  };

  const alert = () => {
    return <div className="text-xs text-red-400">{errors}</div>;
  };

  const displayKeyboard = () => {
    if (!state) {
      keyboard.current.style.display = "block";
      setState(true);
    } else {
      keyboard.current.style.display = "none";
      setState(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-start gap-0 mt-3 border-t h-18">
        <div className="w-10 cursor-pointer" onClick={displayKeyboard}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="hidden makemodal" ref={keyboard}>
            <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} />
          </div>
        </div>
        <textarea
          name="text"
          onChange={changeHandler}
          placeholder="Add a comment"
          className="w-full h-12 mr-1 focus:outline-none"
        ></textarea>

        <button onClick={submitHandler}>Post</button>
      </div>
      {errors.length !== 0 ? alert() : ""}
    </React.Fragment>
  );
};

export default Comment;
