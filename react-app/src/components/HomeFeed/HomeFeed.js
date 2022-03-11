import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { makePost, allPost } from "../../store/posts";
import "./HomeFeed.css";

import React, { useState } from "react";
import { Modal } from "../Modals/ModalContext/Modal";
import MainPageModal from "../Modals/MainPageModal";
import Footer from "../Footer/Footer";

const HomeFeed = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const allPosts = useSelector((state) => state.post.posts);


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

        >
          <ul>
            <li>{post.id}</li>
            <li>{post.user_id}</li>
            <img className="picImg" src={post.img_src} alt="Broken Img URL" onClick={() => setShowModal(true)}/>

          {showModal && (
              <Modal onClose={() => setShowModal(false)}>
              <MainPageModal closeModal={() => setShowModal(false) } modalInfo={post}/>

            </Modal>
          )}

            <li>{post.caption_content}</li>
            <li>{post.location}</li>
          </ul>
        </div>
      ))}
    <Footer />
    </div>
  );
};

export default HomeFeed;


