import React, { useState } from "react";
import { Modal } from '../../../../ModalContext/Modal'
import UpdateCommentForm from "./editCommentForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UpdateCommentModal({  modalInfo }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <FontAwesomeIcon icon="fa-regular fa-pen-to-square" onClick={() => setShowModal(true)}/>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateCommentForm setShowModal={setShowModal} modalInfo={modalInfo}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateCommentModal;
