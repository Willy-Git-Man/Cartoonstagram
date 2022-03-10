import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allComments } from "../../../../store/comments";
import { allLike, deleteLike, makeLike } from "../../../../store/likes";
import DeletePostModal from "../DeletePostModel/DeletePostSetup";
import CommentSection from "./commentSection";
import "./commentCss.css";

const MainPageModal = ({ modalInfo }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const currentUserLiked = useSelector((state) => state.likes.likes);

  console.log(modalInfo, "this is the modalInfo");

  console.log("currentUserLiked:", currentUserLiked);
  useEffect(() => {
    dispatch(allLike(modalInfo.id));
    dispatch(allComments(modalInfo.id));
  }, [modalInfo.id, dispatch]);

  const handleLike = async () => {
    console.log("from handleLike in MainPageModal");
    console.log("modalinfo on like", modalInfo.id);
    dispatch(makeLike(modalInfo.id));
  };

  const handleDeleteLike = async () => {
    dispatch(deleteLike(modalInfo.id));
  };
  // if ((currentUserLiked[0].user_id === currentUser.id) === true)
  // if (likeValuesArr[0]/)
  if (currentUserLiked.length > 0)
    return (
      <div className="entireModal">
      <div className="pictureMainDiv">
        <div>
          <img className="modalImage" src={modalInfo.img_src} alt="Faulty Url" />
        </div>
        <div>{modalInfo.caption_content}</div>

        {/* <button onClick={handleLike}>Like</button> */}
        <button onClick={handleDeleteLike}>Unlike</button>

        {currentUser.id === modalInfo.user_id && (
          <DeletePostModal modalInfo={modalInfo} />
          )}

        <div className="commentsDiv">
          <CommentSection modalInfo={modalInfo} />
        </div>
      </div>
          </div>
    );
  else
    return (
      <div className="postDiv">
        <div className="leftPanel">
          <img className="modalImage" src={modalInfo.img_src} alt="Faulty Url" />

        <p>{modalInfo.caption_content}</p>

        <button onClick={handleLike}>Like</button>
        {/* <button onClick={handleDeleteLike}>Unlike</button> */}
        {currentUser.id === modalInfo.user_id && (
          <DeletePostModal modalInfo={modalInfo} />
          )}
          </div>
        {/* <DeletePostModal modalInfo={modalInfo}/> */}
        <CommentSection className="commentSection" modalInfo={modalInfo} />
      </div>
    );
};

export default MainPageModal;
