import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allComments } from "../../../../store/comments";
import { allLike, deleteLike, makeLike } from "../../../../store/likes";
import DeletePostModal from '../DeletePostModel/DeletePostSetup';
import CommentSection from "./commentSection";

const MainPageModal = ({ modalInfo }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const currentUserLiked = useSelector((state) => state.likes.likes);

  console.log(modalInfo, 'this is the modalInfo')

  console.log("currentUserLiked:", currentUserLiked);
  useEffect(() => {
    dispatch(allLike(modalInfo.id));
    dispatch(allComments(modalInfo.id));
  }, [modalInfo.id, dispatch]);

  const handleLike = async () => {
    console.log("from handleLike in MainPageModal");
    console.log('modalinfo on like',modalInfo.id);
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
          <img src={modalInfo.img_src} alt="Faulty Url"/>
        </div>
        <div>{modalInfo.caption_content}</div>

        {/* <button onClick={handleLike}>Like</button> */}
        <button onClick={handleDeleteLike}>Unlike</button>

        {(currentUser.id === modalInfo.user_id) && <DeletePostModal modalInfo={modalInfo}/>} 

        <CommentSection modalInfo={modalInfo}/>

      </div>
    );
  else
    return (
      <div>
        <div>
          <img src={modalInfo.img_src} alt="Faulty Url"/>
        </div>

        <div>{modalInfo.caption_content}</div>

        <button onClick={handleLike}>Like</button>
        {/* <button onClick={handleDeleteLike}>Unlike</button> */}
        {(currentUser.id === modalInfo.user_id) && <DeletePostModal modalInfo={modalInfo}/>} 
        {/* <DeletePostModal modalInfo={modalInfo}/> */}
        <CommentSection modalInfo={modalInfo}/>
      </div>
    );
};



export default MainPageModal;
