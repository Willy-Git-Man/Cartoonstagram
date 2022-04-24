import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAPost, editPost, getUserPosts } from "../../../../store/posts";
import './DeletePostModal.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


function DeleteEditModal({closeModal, modalInfo, deletePost, edit, setDelete, setEdit}){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [img_src, setImg] = useState(modalInfo.img_src);
    const [caption_content, setCaption] = useState(modalInfo.caption_content);
    const [location, setLocation] = useState(modalInfo.location);

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
        }else{
            const data = await result.json()
            setErrors([data.errors])
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
            <div className="delete-popup-container">

                <div onClick={handleDelete} className='delete-button'>Confirm Delete</div>
                <div onClick={handleCancel} className='cancel-button'>Cancel</div>

            </div>
        )
    }
    if (edit) {
        return(
            <div className='post-form-container'>
            <p className='create-post-text'>Update Post</p>

                <form className='post-form' onSubmit={handleSubmit}>
                    <div className='errorMessagePost'>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                            ))}
                    </div>
                    <div className='all-input-fields'>
                        <div>
                            <div className='input-caption-div'>
                                <input
                                    type='text'
                                    name='caption_content'
                                    className='input-field'
                                    onChange={(e) => setCaption(e.target.value)}
                                    value={caption_content}
                                    placeholder='Caption'
                                    ></input>
                            </div>
                            <div className='input-div'>
                                <input
                                    type='text'
                                    name='location'
                                    className='input-field'
                                    onChange={(e) => setLocation(e.target.value)}
                                    value={location}
                                    placeholder='Location'
                                    ></input>
                            </div>
                        </div>

                    <input
                        type='file'
                        id='choose-file-button'
                        accept="image/*"
                        name='img_src'
                        onChange={updateImage}
                        hidden='hidden'
                        ></input>
                        <label htmlFor='choose-file-button' className='choose-file-button'><FontAwesomeIcon icon="fa-solid fa-image" size='2x' color='rgba(0,149,246)'/>
                        {img_src ? <FontAwesomeIcon icon="fa-solid fa-circle-check" color='green' className='checkmark'/> : ''}</label>
                        <div className='choose-file-name'>{img_src ? img_src.name : ''}</div>

                    </div>
                    <button className='post-submit-button' type='submit'>Confirm Changes</button>
                    <button className='cancel-changes-button' onClick={handleCancel}>Cancel</button>
                </form>

            </div>
        )
    }
}


export default DeleteEditModal
