import React, { useState } from 'react';
import { Modal } from '../../../ModalContext/Modal';
import PostForm from './PostForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostFormModal = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <FontAwesomeIcon icon="fa-regular fa-square-plus" onClick={() => setShowModal(true)}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm closeModal={() => setShowModal(false)} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default PostFormModal;
