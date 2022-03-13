import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./userList.css";

function UsersList() {
  const currentUser = useSelector((state) => state.session.user);


  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);




  const userComponents = users.map((user, i) => {
    if (user.id !== currentUser.id) {
      return (
        <>
          <NavLink className="followNavLink" to={`/users/${user.id}`} key={i}>
            <div className="followerDivEach" >
              <img className="pictureImg" src={user.profile_img_src} alt="" />

                {user.username}
            </div>
          </NavLink>
        </>

      );
    }
  });

  return (
          <div>{userComponents}</div>
  );
}

export default UsersList;
