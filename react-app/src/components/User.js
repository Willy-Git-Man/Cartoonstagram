import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addFollower, removeFollower, userFollowers } from '../store/followers';
import './userStyles.css'
import SpecificPageModel from "./Modals/PostsForm/SpecificPost/SpecificPostModel";
import { getUserPosts } from '../store/posts';

function User() {
  const [followeds, setFolloweds] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)
  const postUser  = useSelector(state => state.session.allUsers)
  const currentUserFolloweds = useSelector(state => state.follows)
  const specificUserPosts = useSelector(state => state.post.userPosts)


  useEffect(() => {
    dispatch(getUserPosts(userId))
    dispatch(userFollowers(parseInt(currentUser.id)))
    if (!userId) {
      return;
    }


    (async () => {
      const response = await fetch(`/follows/${userId}/followeds`)
      const followeds = await response.json()
      setFolloweds(followeds.follows);
    })();

    (async () => {
      const response = await fetch(`/follows/${userId}/followers`)
      const followers = await response.json()
      setFollowers(followers.followers.length);
    })();

  }, [userId, dispatch, currentUser.id]);


  if (!postUser[userId]) {
    return null;
  }
  const handleFollow = async(e) => {
    dispatch(addFollower(userId))
    setFollowers(() => followers + 1)
  }

  const handleUnfollow = async(e) => {
    dispatch(removeFollower(userId))
    setFollowers(() => followers - 1)
  }

  return (
    <div className='profile-page-container'>
      <div className='profile-user-info'>
        <img className='profile-profile-pic' src={postUser[userId].profile_img_src} alt=''/>
        <ul className='user-info'>
          <li className='profile-username-and-follow-container'>
            <div className='profile-username'>
              {postUser[userId].username}
            </div>
            <div className='profile-follow-button-container'>
              {parseInt(userId) !== parseInt(currentUser.id) && !(currentUserFolloweds[userId]) &&
              <button className='profile-follow-button' onClick={handleFollow}>Follow</button>}
              {parseInt(userId) !== parseInt(currentUser.id) && currentUserFolloweds[userId] &&
              <button className='profile-follow-button' onClick={handleUnfollow}>Unfollow</button>}
            </div>
          </li>
          <li className='post-and-follow-info'>
            <div>{specificUserPosts.length} posts</div>
            <div>{followeds.length} following</div>
            <div>{followers} followers</div>
          </li>
        </ul>
        <div className='empty-div'></div>
      </div>

      <div className='profile-img-container'>
      { specificUserPosts &&
        specificUserPosts.map((post, i) => (
          <SpecificPageModel key={i} modelInfo={post}/>

        ))}
      </div>
    </div>
  );
}
export default User;
