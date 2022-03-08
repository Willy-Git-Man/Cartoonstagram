
import React from 'react';

const MainPageModal = ({modalInfo}) => {

  return (
    <div>
      <div>
        <img src={modalInfo.img_src} />
      </div>
      <div>
        {modalInfo.caption_content}
      </div>
    </div>
  );
}

export default MainPageModal;
