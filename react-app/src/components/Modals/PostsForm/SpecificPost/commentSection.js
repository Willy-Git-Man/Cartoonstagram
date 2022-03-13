import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allComments,
  makeComment,
} from "../../../../store/comments";
import { allLike, deleteLike, makeLike } from "../../../../store/likes";
import { getUsers } from "../../../../store/session";
import DeletePostModal from "../DeletePostModel/DeletePostSetup";
import MouseOverComment from "./MouseOverComment";

import "./commentCss.css";

function CommentSection({ modalInfo }) {
  const dispatch = useDispatch();

  const [commentContent, setCommentContent] = useState("");
  const all_users = useSelector(state => state.session.allUsers)
  const currentComments = useSelector((state) => state.comments.comments);
  const user = useSelector((state) => state.session.user);
  const commentArray = Object.values(currentComments);
  const likes = useSelector(state => state.likes)


  useEffect(() => {
    dispatch(allComments(modalInfo.id))
    dispatch(getUsers())
    dispatch(allLike(modalInfo.id))
  }, [dispatch, modalInfo.id])



  const handleDeleteLike = async () => {
    dispatch(deleteLike(modalInfo.id));
  };

  const handleLike = async () => {
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
        <div className="profilePicUsernameModal">
          <img className='imageOnMainPostModal' src={all_users[modalInfo.user_id].profile_img_src} alt=''/>
          {all_users[modalInfo.user_id].username}
        </div>

          {user.id === modalInfo.user_id && <DeletePostModal modalInfo={modalInfo}/>}

        </div>
        <div className="profileCommentUsernameSection">
          <img className='imageOnMainPostModal' src={all_users[modalInfo.user_id].profile_img_src} alt=''/>
          <div className='usernameCommentOnCommentSection'>
            <span className="usernameOnSection">{all_users[modalInfo.user_id].username}</span>
            <span>{modalInfo.caption_content}</span>
          </div>
        </div>
        <div className="getAllCommentsScroll">
        {commentArray.map((comment, i) => (
          <MouseOverComment comment={comment} key={i}/>
        ))}
        </div>



      <div className="lowerSectionCreateLikeComment">
        <div>
          {likes[user.id] && <i className="fa-solid fa-heart colorHeart" onClick={handleDeleteLike}></i>}
          {!likes[user.id] && <i className="fa-regular fa-heart" onClick={handleLike}></i>}
        </div>
        <form className="commentFormForPost" onSubmit={handleSubmit}>
          <input className="commentInput"
            type="text"
            name="comment"
            placeholder="Add a comment..."
            onChange={(e) => setCommentContent(e.target.value)}
            value={commentContent}
          ></input>
          <button className="commentPostButton" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>


  );
}

export default CommentSection;
