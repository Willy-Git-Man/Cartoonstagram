import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allLike, deleteLike, makeLike } from "../../../../store/likes";

const MainPageModal = ({ modalInfo }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const currentUserLiked = useSelector((state) => state.likes.likes);

  console.log("currentUserLiked:", currentUserLiked);
  useEffect(() => {
    dispatch(allLike(modalInfo.id));
  }, [modalInfo.id, dispatch]);

  const handleLike = async () => {
    console.log("from handleLike in MainPageModal");
    console.log(modalInfo.id);
    dispatch(makeLike(modalInfo.id));
  };

  const handleDeleteLike = async () => {
    dispatch(deleteLike(modalInfo.id));
  };
  // if ((currentUserLiked[0].user_id === currentUser.id) === true)
  // if (likeValuesArr[0]/)
  if (currentUserLiked.length > 0)
    return (
      <div>
        <div>
          <img src={modalInfo.img_src} alt="Falty Url"/>
        </div>
        <div>{modalInfo.caption_content}</div>

        {/* <button onClick={handleLike}>Like</button> */}
        <button onClick={handleDeleteLike}>Unlike</button>
      </div>
    );
  else
    return (
      <div>
        <div>
          <img src={modalInfo.img_src} alt="Falty Url"/>
        </div>
        <div>{modalInfo.caption_content}</div>

        <button onClick={handleLike}>Like</button>
        {/* <button onClick={handleDeleteLike}>Unlike</button> */}
      </div>
    );
};

export default MainPageModal;
