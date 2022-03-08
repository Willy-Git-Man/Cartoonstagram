import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {allLike, deleteLike, makeLike} from '../../../../store/likes'



const MainPageModal = ({ modalInfo }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const currentUserLiked = useSelector(state => state.likes);
  const { userId } = useParams();

  console.log('here we are', currentUser)
  console.log('here we are again', currentUserLiked[userId])
  

  useEffect(() => {
    dispatch(allLike(modalInfo.id))
  }, [ modalInfo.id, dispatch ])

  const handleLike= async() => {
    console.log('from handleLike in MainPageModal')
    console.log(modalInfo.id)
    dispatch(makeLike(modalInfo.id))
  }

  const handleDeleteLike= async() => {
    dispatch(deleteLike(modalInfo.id))
  }


  return (
    <div>
      <div>
        <img src={modalInfo.img_src} />
      </div>
      <div>
        {modalInfo.caption_content}
      </div>

      {parseInt(userId) !== parseInt(currentUser.id) && !(currentUserLiked[userId]) &&
      <button onClick={handleLike}>Like</button>}
      {parseInt(userId) !== parseInt(currentUser.id) && currentUserLiked[userId] &&
      <button onClick={handleDeleteLike}>Unlike</button>}

    </div>
  );
}

export default MainPageModal;
