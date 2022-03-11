import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addFollower, removeFollower, userFollowers } from '../store/followers';
import './userStyles.css'
import SpecificPageModel from "./Modals/PostsForm/SpecificPost/SpecificPostModel";

function User() {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [followeds, setFolloweds] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)
  const currentUserFolloweds = useSelector(state => state.follows)
  // let follows;
  // const userFollowing = async (userId) => {
    
  // }

  // userFollowing(userId)

  // console.log(follows)

  useEffect(() => {
    dispatch(userFollowers(parseInt(currentUser.id)))
    
    if (!userId) {
      return;
    }

    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user.user);
      setUserPosts(user.posts)
      
    })();

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


  if (!user) {
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
        <img className='profile-profile-pic' src={user.profile_img_src} alt=''/>
        <ul className='user-info'>
          <li className='profile-username-and-follow-container'>
            <div className='profile-username'>
              {user.username}
            </div>
            <div className='profile-follow-button-container'>
              {parseInt(userId) !== parseInt(currentUser.id) && !(currentUserFolloweds[userId]) &&
              <button className='profile-follow-button' onClick={handleFollow}>Follow</button>}
              {parseInt(userId) !== parseInt(currentUser.id) && currentUserFolloweds[userId] &&
              <button className='profile-follow-button' onClick={handleUnfollow}>Unfollow</button>}
            </div>
          </li>
          <li className='post-and-follow-info'>
            <div>{userPosts.length} posts</div>
            <div>{followeds.length} following</div>
            <div>{followers} followers</div>
          </li>
        </ul>
        <div className='empty-div'></div>
      </div>
      
      <div className='profile-img-container'>
      { userPosts && 
        userPosts.map((post, i) => (
          <SpecificPageModel key={i}  modelInfo={post}/>
          // <img className='profile-img' key={i} src={post.img_src} alt=''/>
        ))}
      </div>
    </div>
  );
}
export default User;
