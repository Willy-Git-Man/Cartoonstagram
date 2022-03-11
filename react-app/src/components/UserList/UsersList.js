import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './userList.css'

function UsersList() {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.session.user)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <div className="followerDivEach">
        <img className="pictureImg" src={user.img_src} alt="Broken Img URL" />
        <NavLink className="followNavLink" to={`/users/${user.id}`}>{user.username}</NavLink>

      </div>


    );
  });

  return (
    <>
    {/* <div className="followerUserNav">
    <img className="picImgUserFollower" src={user.profile_img_src} alt="Broken Img URL"/>
    <h1>{user.username}</h1>
  <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </div> */}
      <h3 className="followDivH1">Suggestions for you</h3>
      <ul className="navlinkUl">{userComponents}</ul>
    </>
  );
}

export default UsersList;
