import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allComments,
  deleteCommentThunk,
  makeComment,
} from "../../../../store/comments";

const CommentSection = ({ modalInfo }) => {
  const dispatch = useDispatch();
  const currentComments = useSelector((state) => state.comments.comments);
  // const currentCommentsValues = Object.values(currentComments)
  const user = useSelector(state => state.session.user);

  console.log("currentComments:", currentComments);

  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      user_id: user.id,
      post_id: 13,
      comment_content: "hello",
    };

    dispatch(makeComment(comment));
  };
  return (
    <div className="commentSection">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="comment"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        ></input>
      <button type='submit'>Post Comment</button>
    </form>
    {/* {currentCommentsValues.map((comment) => (
      <h1>comment.comment_content</h1>
    ))} */}
        </div>
  );
};

export default CommentSection;
