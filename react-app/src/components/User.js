import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const [follow, setFollow] = useState(false);
  const { userId }  = useParams();

  const currentUser = useSelector(state => state.session.user)
  console.log('HELLO', currentUser)

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const handleFollow = async(e) => {
    const response = await fetch(`/follows/${userId}`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    })
    setFollow(true)
  }

  const handleUnfollow = async(e) => {
    const response = await fetch(`/follows/${userId}/unfollow`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    })
    setFollow(false)
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
      {userId !== currentUser.id && !follow &&
      <button onClick={handleFollow}>Follow</button>}
      {userId !== currentUser.id && follow &&
      <button onClick={handleUnfollow}>Unfollow</button>}
    </div>
  );
}
export default User;
