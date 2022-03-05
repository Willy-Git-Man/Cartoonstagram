import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makePost } from '../store/posts';

const PostForm = () => {
    const [errors, setErrors] = useState([]);
    const [img_src, setImg] = useState('');
    const [caption_content, setCaption] = useState('');
    const [location, setLocation] = useState('');

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const post = {
            user_id: user.id,
            img_src,
            caption_content,
            location
        }

        dispatch(makePost(post))


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
            <button type='submit'>Post</button>
        </form>
    )
}


export default PostForm;
