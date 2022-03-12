import React, { useState } from 'react';
import { Modal } from '../../../ModalContext/Modal';
import PostForm from './PostForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const PostFormModal = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <i className="fa-regular fa-square-plus" onClick={() => setShowModal(true)}></i>
      {/* <button className='edit-button' onClick={() => setShowModal(true)}>Create Post</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm closeModal={() => setShowModal(false)} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default PostFormModal;
