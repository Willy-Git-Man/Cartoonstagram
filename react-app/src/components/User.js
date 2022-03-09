import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addFollower, removeFollower, userFollowers } from '../store/followers';

function User() {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)
  const currentUserFolloweds = useSelector(state => state.follows)

  console.log('consoleeeee', currentUserFolloweds[userId])
  console.log('conditional', currentUserFolloweds[userId])
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
    <div>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      {parseInt(userId) !== parseInt(currentUser.id) && !(currentUserFolloweds[userId]) &&
      <button onClick={handleFollow}>Follow</button>}
      {parseInt(userId) !== parseInt(currentUser.id) && currentUserFolloweds[userId] &&
      <button onClick={handleUnfollow}>Unfollow</button>}
      {userPosts && 
      userPosts.map((post, i) => (
        <img key={i} src={post.img_src} alt=''/>
      ))}
    </div>
  );
}
export default User;
