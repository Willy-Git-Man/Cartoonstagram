import React, { useState } from 'react';
import { Modal } from '../../../ModalContext/Modal';
import PostForm from './PostForm';
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

const PostFormModal = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <i className="fa-regular fa-square-plus" onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm closeModal={() => setShowModal(false)} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default PostFormModal;
