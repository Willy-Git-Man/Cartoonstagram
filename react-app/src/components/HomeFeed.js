import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { makePost, allPost } from "../store/posts";

const HomeFeed = () => {
    const dispatch = useDispatch();

    const allPosts = useSelector(state => state.post.posts);
    console.log('POST', allPosts);

    useEffect(() => {
        dispatch(allPost())
    }, [dispatch])

    return (
        <div>
            <h1>Coming from HomeFeed</h1>
            {allPosts.map((post) => (
                <div className='postDiv' key={post.id}>
                    <ul>
                        <li>{post.id}</li>
                        <li>{post.user_id}</li>
                        {/* <li>{post.img_src}</li> */}
                        <img className='picImg' src={post.img_src} alt='Broken Img URL'/>
                        <li>{post.caption_content}</li>
                        <li>{post.location}</li>
                    </ul>
                </div>
            ))}
        </div>
        )
}

export default HomeFeed