import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { deleteAPost, editPost} from "../../../../store/posts";

function DeleteEditModal({closeModal, modalInfo, deletePost, edit}){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [img_src, setImg] = useState(modalInfo.img_src);
    const [imageLoading, setImageLoading] = useState(false);
    const [caption_content, setCaption] = useState(modalInfo.caption_content);
    const [location, setLocation] = useState(modalInfo.location);

    const postId = modalInfo.id;
    console.log("deleting modalinfo", modalInfo)

    function handleDelete(){
        dispatch(deleteAPost(modalInfo.id))
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

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImg(file);
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
            <div>
                <input
                    type='file'
                    accept="image/*"
                    name='img_src'
                    onChange={updateImage}
                ></input>
                {/* <p>{img_src}</p> */}
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
                <button onClick={closeModal}>Cancel</button>
            </>
        )
    }
}


export default DeleteEditModal
