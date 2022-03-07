import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { makePost, allPost } from "../store/posts";
import "./HomeFeed.css";

import React, { useState } from "react";
import { Modal } from "../ModalContext/Modal";
import MainPageModal from "./MainPageModal";

const HomeFeed = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const allPosts = useSelector((state) => state.post.posts);
//   const allComments = useSelector((state) => state.commenet.comments)
  console.log("at 0 img src", allPosts[0].img_src);

  useEffect(() => {
    dispatch(allPost());
  }, [dispatch]);

  return (
    <div className="mainHomeDiv">
      <h1>Coming from HomeFeed</h1>
      {allPosts.map((post) => (
        <div
          className="postDiv"
          key={post.id}
        //   onClick={() => setShowModal(true)}
        >
          <ul>
            <li>{post.id}</li>
            <li>{post.user_id}</li>
            {/* <li>{post.img_src}</li> */}
            <img className="picImg" src={post.img_src} alt="Broken Img URL" onClick={() => setShowModal(true)}/>


          {showModal && (
              <Modal onClose={() => setShowModal(false)}>
              <MainPageModal closeModal={() => setShowModal(false)}/>
              <img className="picImg" src={[allPosts[1]]?.img_src} alt="Broken Img URL"/>
              {/* <div>
                  {allComments[post_id]}
              </div> */}

            </Modal>
          )}

            {/* <button className='edit-button' onClick={() => setShowModal(true)}>Edit</button> */}





            <li>{post.caption_content}</li>
            <li>{post.location}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HomeFeed;



// {showModal && (
//     <Modal onClose={() => setShowModal(false)}>
//       <MainPageModal closeModal={() => setShowModal(false)} />
//       <img
//         className="picImg"
//         src={post.img_src}
//         alt="Broken Img URL"
//       />
//     </Modal>
//   )}
