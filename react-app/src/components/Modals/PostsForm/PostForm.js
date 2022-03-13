import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makePost } from '../../../store/posts';
import './PostForm.css'

const PostForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [img_src, setImg] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [caption_content, setCaption] = useState('');
    const [location, setLocation] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("img_src", img_src);
        formData.append("caption_content", caption_content);
        formData.append("location", location)

        const results = await dispatch(makePost(formData))
        if (results === 'Success'){
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
            <form className='post-form' onSubmit={handleSubmit}>
                <div className='postErrors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <p className='create-post-text'>Create New Post</p>
                <div className='choose-file-container'>
                </div>
                <div>
                    <input
                        type='text'
                        className='caption-content-field'
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
                        className='location-field'
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        placeholder='Location'
                        ></input>
                </div>
                <input
                        type='file'
                        id='chooseFileInput'
                        accept='image/*'
                        name='img_src'
                        onChange={updateImage}
                        hidden='hidden'
                    ></input>
                    <label for='chooseFileInput' className='choose-file-button'>Picture Upload</label>
                <button className='post-submit-button' type='submit'>Post</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}


export default PostForm;
