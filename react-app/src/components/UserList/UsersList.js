import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./userList.css";

function UsersList() {


  // const [user, setUser] = useState({});
  // const [userPosts, setUserPosts] = useState([]);
  // const [followeds, setFolloweds] = useState([]);
  // const [followers, setFollowers] = useState([]);
  // const { userId }  = useParams();



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
    return (
      <div className="followerDivEach">
        <img className="pictureImg" src={user.img_src} alt="Broken Img URL" />
        <NavLink className="followNavLink" to={`/users/${user.id}`}>
          {user.username}
        </NavLink>
      </div>
    );
  });

  return (
    <>
      <h3 className="followDivH1">Suggestions for you</h3>
      <ul className="navlinkUl">{userComponents}</ul>
    </>
  );
}

export default UsersList;
