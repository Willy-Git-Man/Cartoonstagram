import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserPosts, makePost } from '../../../store/posts';
import { useParams } from 'react-router-dom';
import './PostForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [img_src, setImg] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [caption_content, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const { userId }  = useParams();

    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("img_src", img_src);
        formData.append("caption_content", caption_content);
        formData.append("location", location)

        const results = await dispatch(makePost(formData))
        if (results === 'Success'){
            if(userId){
                dispatch(getUserPosts(userId))
            }
            setImageLoading(false)
            setShowModal(false)
        }else{
            const data = await results.json()
            setErrors([data.errors])
        }

    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImg(file);
    }

    return (
        <div className='post-form-container'>
            <p className='create-post-text'>Create New Post</p>
            <form className='post-form' onSubmit={handleSubmit}>
                <div className='errorMessagePost'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                {/* <div className='choose-file-container'>
                </div> */}
                <div className='all-input-fields'>
                    <div>
                        <div className='input-caption-div'>
                            <input
                                type='text'
                                className='input-field'
                                name='caption_content'
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
                            id='chooseFileInput'
                            accept='image/*'
                            name='img_src'
                            onChange={updateImage}
                            hidden='hidden'
                        ></input>
                        <label htmlFor='chooseFileInput' className='choose-file-button'><FontAwesomeIcon icon="fa-solid fa-image" size='2x' color='rgba(0,149,246)'/>
                        {img_src ? <FontAwesomeIcon icon="fa-solid fa-circle-check" color='green' className='checkmark'/> : ''}</label>
                </div>
                <button className='post-submit-button' type='submit'>Post</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}


export default PostForm;
