import React, { useState } from 'react';
import { Modal } from '../../../ModalContext/Modal';
// import EditEventPage from '../';
// import './PostFormModal.css';
import PostForm from './PostForm';

const PostFormModal = () => {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <>
      <button className='edit-button' onClick={() => setShowModal(true)}>Create Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm closeModal={() => setShowModal(false)} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default PostFormModal;