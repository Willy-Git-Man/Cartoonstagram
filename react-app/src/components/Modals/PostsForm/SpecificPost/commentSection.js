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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUsers } from "../../../../store/session";
import DeletePostModal from "../DeletePostModel/DeletePostSetup";

import "./commentCss.css";

function CommentSection({ modalInfo }) {
  const dispatch = useDispatch();

  const [commentContent, setCommentContent] = useState("");
  const all_users = useSelector(state => state.session.allUsers)
  const currentComments = useSelector((state) => state.comments.comments);
  const user = useSelector((state) => state.session.user);
  const commentArray = Object.values(currentComments);


  useEffect(() => {
    dispatch(allComments(modalInfo.id))
    dispatch(getUsers())
  }, [dispatch, modalInfo.id])



  const handleDeleteLike = async () => {
    dispatch(deleteLike(modalInfo.id));
  };

  const handleLike = async () => {
    console.log("from handleLike in MainPageModal");
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
      <div className="rightTopPostCreator">
        <img className='imageOnMainPostModal' src={all_users[modalInfo.user_id].profile_img_src} alt=''/>

          {all_users[modalInfo.user_id].username}
          {user.id === modalInfo.user_id && <DeletePostModal modalInfo={modalInfo}/>}

        </div>


        {commentArray.map((comment, i) => (
          <div className="commentDivMainPostModal" key={i}>
            <img
              className="imageForIndividualComments"
              src={all_users[comment.user_id].profile_img_src}
              alt=""
              />
            <h3 className="">
              {all_users[comment.user_id].username}: {comment.comment_content}
            </h3>

              {comment.user_id === user.id && (
                <button
                className=""
                onClick={() => dispatch(deleteCommentThunk(comment.id))}
                >
                  Delete
                </button>
              )}

              {comment.user_id === user.id && (
                <UpdateCommentModal
                className=""
                modalInfo={comment}
                />
                )}

          </div>))}




      <div>
        <i className="fa-regular fa-heart" onClick={handleLike}></i>
        <i className="fa-regular fa-heart" onClick={handleDeleteLike}></i>
      </div>
      <form className="" onSubmit={handleSubmit}>
        <input className=""
          type="text"
          name="comment"
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
        ></input>
        <button className="" type="submit">
          <i className="fa fa-comments" aria-hidden="true"></i>
        </button>
      </form>
    </div>


  );
}

export default CommentSection;
