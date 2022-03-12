import React, { useState } from "react";
import DeleteEditModal from "./DeletePostModal";
import { Modal } from '../../../../ModalContext/Modal'
import './DeletePostSetup.css'

function DeletePostModal({ modalInfo }) {
    const [showModal, setShowModal] = useState(false);
    const [deletePost, setDelete] = useState(false);
    const [edit, setEdit] = useState(false);

    function handleDelete(){
        setShowModal(true)
        setDelete(true)
    }

    function handleEdit(){
        setShowModal(true)
        setEdit(true)
    }

    function handleModalClose() {
        setShowModal(false)
        setDelete(false)
        setEdit(false)
    }
    
    return (
        <div className='edit-delete-modal-container'>
            <div className='edit-delete-modal-buttons'>

            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>

            {showModal && (
                <Modal onClose={(handleModalClose)}>
                    <DeleteEditModal closeModal={() => setShowModal(false) } modalInfo={modalInfo} deletePost={deletePost} edit={edit}/>
                </Modal>
            )}
            </div>
        </div>
    )
}

export default DeletePostModal;