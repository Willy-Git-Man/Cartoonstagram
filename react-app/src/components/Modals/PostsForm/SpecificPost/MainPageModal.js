import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allComments } from "../../../../store/comments";
import { allLike, deleteLike, makeLike } from "../../../../store/likes";
import DeletePostModal from "../DeletePostModel/DeletePostSetup";
import CommentSection from "./commentSection";
import { getUsers } from "../../../../store/session";
import "./commentCss.css";

const MainPageModal = ({ modalInfo }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const allUsers = useSelector((state) => state.session.allUsers);
  const currentUserLiked = useSelector((state) => state.likes.likes);


  return (

    <div className="postModelDiv">
      <div>
        <img className="modalImage" src={modalInfo.img_src} alt="Faulty Url" />
      </div>
      <div>

        <CommentSection className="commentSection" modalInfo={modalInfo} />
      </div>
    </div>

  );
};

export default MainPageModal;
