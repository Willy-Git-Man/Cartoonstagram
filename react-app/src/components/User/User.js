import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addFollower, removeFollower, userFollowers } from '../store/followers';

function User() {
  const [user, setUser] = useState({});
  // const [follow, setFollow] = useState(false);
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)
  const currentUserFolloweds = useSelector(state => state.follows)

  useEffect(() => {
    dispatch(userFollowers(parseInt(currentUser.id)))
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId, dispatch, currentUser.id]);

  if (!user) {
    return null;
  }

  const handleFollow = async(e) => {
    // const response = await fetch(`/follows/${userId}`,{
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    // })
    // setFollow(true)
    dispatch(addFollower(userId))
    // dispatch(userFollowers(parseInt(currentUser.id)))
  }

  const handleUnfollow = async(e) => {
    // const response = await fetch(`/follows/${userId}/unfollow`,{
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    // })
    // setFollow(false)
    dispatch(removeFollower(userId))
    // dispatch(userFollowers(parseInt(currentUser.id)))
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
    </div>
  );
}
export default User;
