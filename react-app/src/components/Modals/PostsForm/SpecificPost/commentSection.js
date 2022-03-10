import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allComments,
  deleteCommentThunk,
  makeComment,
  updateCommentThunk,
} from "../../../../store/comments";
import { deleteLike, makeLike } from "../../../../store/likes";
import UpdateCommentModal from "../EditCommentModal/editCommentModal";

import "./commentCss.css";

function CommentSection({ modalInfo }) {
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState("");
  const [commentEditContent, setCommentEditContent] = useState("");

  const currentComments = useSelector((state) => state.comments.comments);
  const all_users = useSelector((state) => state.comments.users);
  console.log("currentComments:", currentComments);
  // console.log('STATE COMMENTS',currentComments)
  // const currentCommentsValues = Object.values(currentComments)
  const user = useSelector((state) => state.session.user);
  const commentArray = Object.values(currentComments);
  console.log(all_users);

  const handleDeleteLike = async () => {
    dispatch(deleteLike(modalInfo.id));
  };

  const handleLike = async () => {
    console.log("from handleLike in MainPageModal");
    console.log("modalinfo on like", modalInfo.id);
    dispatch(makeLike(modalInfo.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      user_id: user.id,
      post_id: modalInfo.id,
      comment_content: commentContent,
    };

    setCommentContent("");

    dispatch(makeComment(comment));
  };

  return (
    <div className="commentSection">
      <div className="commentMap">
        {commentArray.map((comment) => (
          <div className="commentArrayDiv" key={comment.id}>
            <div className="commentPicAndName">
              <h1 className="commentUserName">
                {all_users[comment.user_id].username}
              </h1>
              <img
                className="commentProfilePic"
                src={all_users[comment.user_id].profile_img_src}
                alt=""
              />
              <h2>{comment.comment_content}</h2>
            </div>
            {/* <button>Edit</button> */}
            <div className="buttonsDiv">
              {comment.user_id === user.id && (
                <button
                  onClick={() => dispatch(deleteCommentThunk(comment.id))}
                >
                  Delete
                </button>
              )}

              {comment.user_id === user.id && (
                <UpdateCommentModal modalInfo={comment} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="formDiv">
        <form className="commentForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="comment"
            onChange={(e) => setCommentContent(e.target.value)}
            value={commentContent}
          ></input>
          <button type="submit">Post Comment</button>
        <i className="unlikeButton" onClick={handleDeleteLike} class="fas fa-heart"></i>
        <i className="likeButton" onClick={handleLike} class="fas fa-heart"></i>

        </form>
      </div>
    </div>
  );
}

export default CommentSection;
