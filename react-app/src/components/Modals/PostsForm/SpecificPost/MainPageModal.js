
import React from 'react';
import { useDispatch } from 'react-redux';
import {makeLike} from '../../../../store/likes'


const MainPageModal = ({modalInfo}) => {
  const dispatch = useDispatch();

  const handleLike= async(e) => {
    console.log('from handleLike in MainPageModal')
    console.log(modalInfo.id)
    dispatch(makeLike(modalInfo.id))
  }

  // const handleUnlike= async(e) => {
  //   dispatch(removeFollower(userId))
  // }

  return (
    <div>
      <div>
        <img src={modalInfo.img_src} />
      </div>
      <div>
        {modalInfo.caption_content}
      </div>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}

export default MainPageModal;
