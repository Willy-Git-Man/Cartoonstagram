import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAPost, editPost, getPost, getUserPosts } from "../../../../store/posts";
import './DeletePostModal.css'
import { useParams } from 'react-router-dom';


function DeleteEditModal({closeModal, modalInfo, deletePost, edit, setDelete, setEdit}){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [img_src, setImg] = useState(modalInfo.img_src);
    const [imageLoading, setImageLoading] = useState(false);
    const [caption_content, setCaption] = useState(modalInfo.caption_content);
    const [location, setLocation] = useState(modalInfo.location);
    const {userId} = useParams();

    const postId = modalInfo.id;

    function handleDelete(){
        dispatch(deleteAPost(modalInfo.id))
        dispatch(getUserPosts(modalInfo.user_id))
        closeModal()
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("img_src", img_src);
        formData.append("caption_content", caption_content);
        formData.append("location", location)


        const result = await dispatch(editPost(formData, postId))

        if (result === 'Success!') {
            closeModal()
        }

    }

    const handleCancel = () => {
        closeModal()
        setDelete(false)
        setEdit(false)
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImg(file);
    }

    if (deletePost) {
        return(
            <>
             <div className='delete-popup-container'>
                <button onClick={handleDelete} className='delete-button'>Confirm Delete</button>
                <button onClick={handleCancel} className='cancel-button'>Cancel</button>
             </div>
            </>
        )
    }
    if (edit) {
        return(
            <>
            <div className='edit-form-container'>
                <form className='form-inputs' onSubmit={handleSubmit}>
                    <div className='choose-file-button-container'>
                        <input
                            type='file'
                            id='choose-file-button'
                            accept="image/*"
                            name='img_src'
                            onChange={updateImage}
                            hidden='hidden'
                            ></input>
                            <label htmlFor='choose-file-button' className='choose-file-button2' type='button'>Picture Upload</label>
                            <div className='choose-file-name'>{img_src ? img_src : ''}</div>
                    </div>
                    <div>
                        <input
                            type='text'
                            name='caption_content'
                            className='caption-content-field'
                            onChange={(e) => setCaption(e.target.value)}
                            value={caption_content}
                            placeholder='Caption'
                            ></input>
                    </div>
                    <div>
                        <input
                            type='text'
                            name='location'
                            className='location-content-field'
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            placeholder='Location'
                            ></input>
                    </div>
                    <button className='confirm-changes-button' type='submit'>Confirm Changes</button>
                    <button className='cancel-changes-button' onClick={handleCancel}>Cancel</button>
                </form>
            </div>
            </>
        )
    }
}


export default DeleteEditModal
