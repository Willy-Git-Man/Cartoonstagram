import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allComments,
  deleteCommentThunk,
  makeComment,
  updateCommentThunk,
} from "../../../../store/comments";
import UpdateCommentModal from "../EditCommentModal/editCommentModal";

function CommentSection({ modalInfo }) {

  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState('');
  const [commentEditContent, setCommentEditContent] = useState('');

  const currentComments = useSelector((state) => state.comments.comments);
  const all_users = useSelector((state) => state.comments.users)
  console.log('currentComments:', currentComments)
  // console.log('STATE COMMENTS',currentComments)
  // const currentCommentsValues = Object.values(currentComments)
  const user = useSelector(state => state.session.user);
  const commentArray = Object.values(currentComments)
console.log(all_users)

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

//   const handleCommentEdit = async (comment) => {
// console.log('comment:', comment)
// // setCommentContent(comment.comment_content)

//     const newComment = {
//       user_id: user.id,
//       post_id: modalInfo.id,
//       comment_content: "hello",
//       id: comment.id
//     };

//     console.log('newComment:', newComment)


//     dispatch(updateCommentThunk(newComment.id));

//   };
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
    {commentArray.map(comment => (
      <div className="commentArrayDiv" key={comment.id}>
        <h1>{all_users[comment.user_id].username}</h1>
        <img src={all_users[comment.user_id].profile_img_src} alt=''/>
        <h2>{comment.comment_content}</h2>
        {/* <button>Edit</button> */}
        <button onClick={() => dispatch(deleteCommentThunk(comment.id))} >Delete</button>
        {/* <button onClick={() => handleCommentEdit(comment)}>Edit</button> */}
        <UpdateCommentModal modalInfo={comment}/>
      </div>
    ))}
        </div>
  );
};

export default CommentSection;
