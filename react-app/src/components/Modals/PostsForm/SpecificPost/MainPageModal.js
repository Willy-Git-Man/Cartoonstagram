
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {allLike, deleteLike, makeLike} from '../../../../store/likes'


const MainPageModal = ({ modalInfo }) => {
  const dispatch = useDispatch();

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

      <button onClick={handleLike}>Like</button>
      <button onClick={handleDeleteLike}>Unlike</button>

    </div>
  );
}

export default MainPageModal;
