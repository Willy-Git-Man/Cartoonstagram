import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPost } from "../store/posts";
import "./HomeFeed.css";
import { userFollowers } from "../store/followers";

import React from "react";
import SpecificPageModel from "./Modals/PostsForm/SpecificPost/SpecificPostModel";
import UsersList from "./UserList/UsersList";
import { getUsers } from "../store/session";

import { NavLink, useParams } from "react-router-dom";

const HomeFeed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  console.log("user:", user);
  const allPosts = useSelector((state) => state.post.posts);
  const currentUserFolloweds = useSelector((state) => state.follows);
  console.log("currentUserFolloweds:", currentUserFolloweds);

  const followeObj = Object.values(currentUserFolloweds);
  console.log("followeObj:", followeObj);

  const allUsers = useSelector((state) => state.session.allUsers);
  console.log("allUsers:", allUsers[1]);
  // useEffect(() => {
  //   dispatch(getUsers())
  // }, [dispatch]);

  useEffect(() => {
    // dispatch(getUsers())
    dispatch(allPost());
    dispatch(userFollowers(user.id));
  }, [dispatch, user]);

  return (
    <div className="mainPageDivs">
      <div className="mainHomeDiv">
        {/* <h1>hello</h1> */}
        {/* <h1>Coming from HomeFeed</h1> */}
        {/* <p>{AllUsersArr[1].username}</p> */}
        {/* <img className='postProfileImg' key={post.i} src={allUsers[post.user_id].profile_img_src} alt=''/> */}
        {allPosts.map((post) => (
          <div className="postsDiv" key={post.id}>
            {/* {userARr.map((usr) => (
            <h1>usr.username</h1>
          ))} */}
            <div className="postTop">
              <img
                className="postProfileImg"
                key={post.i}
                src={allUsers[post.user_id].profile_img_src}
                alt=""
              />
              <div className="locationAndName">
                <NavLink
                  className="postNavLink"
                  to={`/users/${allUsers[post.user_id].id}`}
                >
                  {allUsers[post.user_id].username}
                </NavLink>
                <span>{post.location}</span>
              </div>
            </div>
            <SpecificPageModel modelInfo={post} />

            <ul className="postInfo">
              {/* <li>{allUsers[post.user_id].username}{post.caption_content}</li> */}
              {/* <img className='postProfileImg' key={post.i} src={allUsers[post.user_id].profile_img_src} alt=''/> */}
              {/* <li>{allUsers[post.user_id].username}</li> */}
              <h5 className="postCaption">
                {allUsers[post.user_id].username}: {post.caption_content}
              </h5>
              {/* <span>{post.location}</span> */}
            </ul>
          </div>
        ))}
      </div>

      <div className="followerDivRight">
        <div className="followerMap">
          {/* {followeObj.map((follow) => (
        // <h1>{follow.follower_id}</h1>
        <NavLink className="followerNavLinks" to={`/users/${follow.id}`}>{follow.username}</NavLink>
      ))} */}

          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;
