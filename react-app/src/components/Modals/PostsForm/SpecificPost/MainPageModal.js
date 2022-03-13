import React from "react";
import CommentSection from "./commentSection";
import "./commentCss.css";

const MainPageModal = ({ modalInfo }) => {

  return (

    <div className="postModelDiv">

        <img className="modalImage" src={modalInfo.img_src} alt="Faulty Url" />

      <div className="leftSideModal">

        <CommentSection className="commentSection" modalInfo={modalInfo} />
      </div>
    </div>

  );
};

export default MainPageModal;
