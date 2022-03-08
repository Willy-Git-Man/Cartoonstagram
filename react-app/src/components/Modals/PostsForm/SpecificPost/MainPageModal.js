import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {allLike, deleteLike, makeLike} from '../../../../store/likes'



const MainPageModal = ({ modalInfo }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const currentUserLiked = useSelector(state => state.likes);

  const likeValuesArr = Object.values(currentUserLiked)
  console.log(likeValuesArr, 'please be here')



  console.log(likeIncludes, "==========")

  console.log('here we are', currentUserLiked)

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

      let likeIncludes = likeValuesArr.forEach(likeObj => {
    console.log(likeObj, 'ppppppppp')
    console.log(likeObj.user_id, currentUser.id)
    if (likeObj.user_id === currentUser.id) {
      return true
    }
    return false
  })
  if (likeIncludes)

  return (
    <div>
      <div>
        <img src={modalInfo.img_src} />
      </div>
      <div>
        {modalInfo.caption_content}
      </div>

     
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDeleteLike}>Unlike</button>

    </div>
  );
  if (!likeIncludes) return 'trying something'
  
}

export default MainPageModal;
