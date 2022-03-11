import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addFollower, removeFollower, userFollowers } from '../store/followers';
import './userStyles.css'

function User() {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)
  const currentUserFolloweds = useSelector(state => state.follows)

  console.log('currentuser', currentUser)
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
  }, [userId, dispatch, currentUser.id]);

  if (!user) {
    return null;
  }
  const handleFollow = async(e) => {
    dispatch(addFollower(userId))
  }

  const handleUnfollow = async(e) => {
    dispatch(removeFollower(userId))
  }

  return (
    <div className='profile-page-container'>
      <div className='profile-user-info'>
        <img className='profile-profile-pic' src={user.profile_img_src} alt=''/>
        <ul className='user-info'>
          <li className='profile-username'>
           {user.username}
          </li>
          <li>
            {userPosts.length} posts
          </li>
        </ul>
        <div className='empty-div'></div>
      </div>
      {parseInt(userId) !== parseInt(currentUser.id) && !(currentUserFolloweds[userId]) &&
      <button onClick={handleFollow}>Follow</button>}
      {parseInt(userId) !== parseInt(currentUser.id) && currentUserFolloweds[userId] &&
      <button onClick={handleUnfollow}>Unfollow</button>}
      <div className='profile-img-container'>
      { userPosts && 
        userPosts.map((post, i) => (
          <img className='profile-img' key={i} src={post.img_src} alt=''/>
        ))}
      </div>
    </div>
  );
}
export default User;
