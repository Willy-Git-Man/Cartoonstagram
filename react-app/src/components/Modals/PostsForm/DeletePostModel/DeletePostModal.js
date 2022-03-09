import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAPost, editPost } from "../../../../store/posts";

function DeleteEditModal({closeModal, modalInfo, deletePost, edit}){
    const dispatch = useDispatch();

    function handleDelete(){
        dispatch(deleteAPost(modalInfo.id))
    }

    function handleEdit() {
        dispatch(editPost(modalInfo.id))
    }

    if (deletePost) {
        return(
            <>
                <h2>Delete Post?</h2>
                <div>
                    Are you sure you want to delete?
                </div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </>
        )
    }
    if (edit) {
        return(
            <>
                <h2>Edit Post</h2>
                <button onClick={handleEdit}>Confirm</button>
                <button onClick={closeModal}>Cancel</button>
            </>
        )
    }
}


export default DeleteEditModal