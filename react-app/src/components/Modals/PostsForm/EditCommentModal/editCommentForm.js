import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentThunk } from "../../../../store/comments";
import './editCommentForm.css'

export default function UpdateCommentForm({ modalInfo, setShowModal }) {
  console.log('modalInfo:', modalInfo)
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const [newCommentEdit, setNewCommentEdit] = useState(modalInfo.comment_content);
  const handleNewComment = (e) => setNewCommentEdit(e.target.value);

  const handleCommentEdit = async (e) => {
    e.preventDefault();


    const newComment = {
      user_id: user.id,
      post_id: modalInfo.post_id,
      comment_content: newCommentEdit
      // id: modalInfo.id
    };
    console.log("newComment:", newComment);

    dispatch(updateCommentThunk(newComment, modalInfo.id));

    setShowModal(false)
  };


  return (
    <div className="createNewCommentDiv">
      <form className="createNewCommentForm" onSubmit={handleCommentEdit}>
        <label htmlFor="commentLabel"></label>
        <textarea
          type="text"
          className='edit-comment-box'
          value={newCommentEdit}
          onChange={handleNewComment}
          required
        />
        <button className="updateCommentFormButton" type="submit">Update</button>
      </form>
    </div>
  );
}
