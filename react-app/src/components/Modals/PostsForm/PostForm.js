import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makePost } from '../../../store/posts';


const PostForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [img_src, setImg] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [caption_content, setCaption] = useState('');
    const [location, setLocation] = useState('');

    const user = useSelector(state => state.session.user);
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
        }

    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImg(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='postErrors'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <input
                    type='file'
                    accept='image/*'
                    name='img_src'
                    onChange={updateImage}
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
            <button type='submit'>Post</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}


export default PostForm;
