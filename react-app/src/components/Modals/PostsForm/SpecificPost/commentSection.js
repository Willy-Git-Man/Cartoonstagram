import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allComments,
  deleteCommentThunk,
  makeComment,
} from "../../../../store/comments";

function CommentSection({ modalInfo }) {
  console.log('modalInfo:', modalInfo)
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState('');
  const currentComments = useSelector((state) => state.comments.comments);
  // const currentCommentsValues = Object.values(currentComments)
  const user = useSelector(state => state.session.user);

  console.log("currentComments:", currentComments);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      user_id: user.id,
      post_id: modalInfo.id,
      comment_content: commentContent
    };

    setCommentContent("")

    dispatch(makeComment(comment));
  };
  return (
    <div className="commentSection">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="comment"
        onChange={(e) => setCommentContent(e.target.value)}
        value={commentContent}
        ></input>
      <button type='submit'>Post Comment</button>
    </form>
    {/* {currentComments.map(comment => {
      <h2>{comment.comment_content}</h2>
    })} */}
        </div>
  );
};

export default CommentSection;
