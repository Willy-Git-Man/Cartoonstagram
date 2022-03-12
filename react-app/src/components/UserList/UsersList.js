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

  // const [user, setUser] = useState({});
  // const [userPosts, setUserPosts] = useState([]);
  // const [followeds, setFolloweds] = useState([]);
  // const [followers, setFollowers] = useState([]);
  // const { userId }  = useParams();
  //
  // const hello = users.filter((user) => user.id != currentUser.id)

  // const user = useSelector((state) => state.session.user);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("/api/users/");
  //     const responseData = await response.json();
  //     setUsers(responseData.users);
  //   }
  //   fetchData();
  // }, []);

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

  // useEffect(() => {
  //   dispatch(userFollowers(parseInt(currentUser.id)))

  //   if (!userId) {
  //     return;
  //   }

  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user.user);
  //     setUserPosts(user.posts)

  //   })();

  //   (async () => {
  //     const response = await fetch(`/follows/${userId}/followeds`)
  //     const followeds = await response.json()
  //     setFolloweds(followeds.follows);
  //   })();

  //   (async () => {
  //     const response = await fetch(`/follows/${userId}/followers`)
  //     const followers = await response.json()
  //     setFollowers(followers.followers.length);
  //   })();

  // }, [userId, dispatch, currentUser.id]);

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
      {/* <div className="followerUserNav">
    <img className="picImgUserFollower" src={user.profile_img_src} alt="Broken Img URL"/>
    <h1>{user.username}</h1>
  <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </div> */}
      <h3 className="followDivH1">Cartoonstagram Users:</h3>
      <div>

      </div>
      <ul className="navlinkUl">{userComponents}</ul>
      {/* <div>{followeds.length} following</div> */}
    </div>
  );
}

export default UsersList;
