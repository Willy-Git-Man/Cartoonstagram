import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAPost, editPost, getPost } from "../../../../store/posts";

function DeleteEditModal({closeModal, modalInfo, deletePost, edit}){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [img_src, setImg] = useState(modalInfo.img_src);
    const [caption_content, setCaption] = useState(modalInfo.caption_content);
    const [location, setLocation] = useState(modalInfo.location);

    const user = modalInfo.id;
    console.log("deleting modalinfo", modalInfo)

    function handleDelete(){
        dispatch(deleteAPost(modalInfo.id))
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const post = {
            user_id: modalInfo.user_id,
            img_src,
            caption_content,
            location
        }

        

        const result = await dispatch(editPost(post, user))

        if (result === 'Success!') {
            closeModal()
        }

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
                <form onSubmit={handleSubmit}>
            {/* <div className='postErrors'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div> */}
            <div>
                <input
                    type='text'
                    name='img_src'
                    onChange={(e) => setImg(e.target.value)}
                    value={img_src}
                    placeholder='Post Image Url'
                ></input>
            </div>
            <div>
                <input
                    type='text'
                    name='caption_content'
                    onChange={(e) => setCaption(e.target.value)}
                    value={caption_content}
                    placeholder='Caption'
                ></input>
            </div>
            <div>
                <input
                    type='text'
                    name='location'
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    placeholder='Location'
                ></input>
            </div>
            <button type='submit'>Confirm Changes</button>
        </form>
                {/* <button onClick={handleEdit}>Confirm Edit</button> */}
                <button onClick={closeModal}>Cancel</button>
            </>
        )
    }
}


export default DeleteEditModal