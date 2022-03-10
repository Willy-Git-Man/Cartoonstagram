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

  useEffect(() => {
    dispatch(allLike(modalInfo.id));
    dispatch(allComments(modalInfo.id));
  }, [modalInfo.id, dispatch]);

  return (
    <div className="postDiv">
          <h3 className="commentCaption">{modalInfo.caption_content}</h3>
      <div className="leftPanel">
        <img className="modalImage" src={modalInfo.img_src} alt="Faulty Url" />
      </div>
        <div className="leftPannelButtons">
          <div className="modalMainButtons"></div>
          {currentUser.id === modalInfo.user_id && (
            <DeletePostModal modalInfo={modalInfo} />
          )}
        </div>
      <CommentSection className="commentSection" modalInfo={modalInfo} />
    </div>
  );
};

export default MainPageModal;
