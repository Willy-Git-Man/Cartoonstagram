import React, { useState } from "react";
import { Modal } from '../../../../ModalContext/Modal'
import UpdateCommentForm from "./editCommentForm";


function UpdateCommentModal({  modalInfo }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {/* <button
        className={"updateCommentModalButton"}
        onClick={() => setShowModal(true)}
      >
        Edit

      </button> */}
      <i className="fa-regular fa-pen-to-square" onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateCommentForm setShowModal={setShowModal} modalInfo={modalInfo}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateCommentModal;
