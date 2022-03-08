import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAPost } from "../../../../store/posts";
function DeleteEditModal({closeModal, modalInfo, deletePost, edit}){
    const dispatch = useDispatch();

    function handleDelete(){
        dispatch(deleteAPost(modalInfo.id))
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
}


export default DeleteEditModal
