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

  const currentUserLiked = useSelector((state) => state.likes.likes);

  const user = useSelector((state) => state.session.user);
  const commentArray = Object.values(currentComments);
  console.log(all_users);
  const currentUser = useSelector((state) => state.session.user);
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
    <div>

      <div className="formDivComments">
        <form className="commentForm" onSubmit={handleSubmit}>
          <input className="addCommentInput"
            type="text"
            name="comment"
            onChange={(e) => setCommentContent(e.target.value)}
            value={commentContent}
            ></input>
          <button className="messageIconButton"type="submit">
            <i class="fa fa-comments" aria-hidden="true"></i>
          </button>
        </form>
        <button className="likeButton" onClick={handleLike}>
          <i class="fas fa-heart"></i>
        </button>
        <button className="unlikeButton" onClick={handleDeleteLike}>
          <i className="likeButton" class="fas fa-heart"></i>
        </button>
      </div>
    <div className="commentSection">



      <div className="commentMap">
        {commentArray.map((comment) => (
          <div className="commentArrayDiv" key={comment.id}>
            <div className="commentPicAndName">
              <img
                className="commentProfilePic"
                src={all_users[comment.user_id].profile_img_src}
                alt=""
                />
              <h3 className="commentUserName">
                {all_users[comment.user_id].username}: {comment.comment_content}
              </h3>
              {/* <h2>{comment.comment_content}</h2> */}
              {/* <button>Edit</button> */}
              {/* <div className="buttonsDiv"> */}
                {comment.user_id === user.id && (
                  <button
                  className="deleteCommentButton"
                  onClick={() => dispatch(deleteCommentThunk(comment.id))}
                  >
                    Delete
                  </button>
                )}

                {comment.user_id === user.id && (
                  <UpdateCommentModal
                  className="editCommentButton"
                  modalInfo={comment}
                  />
                  )}
              </div>
            </div>
          // </div>
        ))}
      </div>
      {/* <div className="formDivComments">
        <form className="commentForm" onSubmit={handleSubmit}>
        <input
        type="text"
        name="comment"
        onChange={(e) => setCommentContent(e.target.value)}
        value={commentContent}
        ></input>
        <button type="submit"><i class="fa fa-comments" aria-hidden="true"></i></button>
        </form>
        <button className="likeButton" onClick={handleLike}>
        <i class="fas fa-heart"></i>
        </button>
        <button className="unlikeButton" onClick={handleDeleteLike}>
        <i className="likeButton" class="fas fa-heart"></i>
        </button>
      </div> */}
    </div>
      </div>
  );
}

export default CommentSection;
