import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  addFollower,
  removeFollower,
  userFollowers,
} from "../../store/followers";
import "./userList.css";

function UsersList() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();


  const [users, setUsers] = useState([]);
  // const user = useSelector((state) => state.session.user);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);




  const userComponents = users.map((user) => {
    if (user.id !== currentUser.id) {
      return (
        // {user.id !== currentUser.id &&
        <div className="followerDivEach">
          <img className="pictureImg" src={user.profile_img_src} alt="" />
          <NavLink className="followNavLink" to={`/users/${user.id}`}>
            {user.username}
          </NavLink>
        </div>
        // }
      );
    }
  });

  return (
    <div>

      <h3 className="followDivH1">Cartoonstagram Users:</h3>
      <div>

      </div>
      <ul className="navlinkUl">{userComponents}</ul>
      {/* <div>{followeds.length} following</div> */}
    </div>
  );
}

export default UsersList;
