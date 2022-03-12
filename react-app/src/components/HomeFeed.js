import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { makePost, allPost } from "../store/posts";
import "./HomeFeed.css";
import followReducer, { userFollowers } from "../store/followers";

import React from "react";
import SpecificPageModel from "./Modals/PostsForm/SpecificPost/SpecificPostModel";
import UsersList from "./UserList/UsersList";

const HomeFeed = () => {


  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const allPosts = useSelector((state) => state.post.posts);

  const userARr = Object.values(user)


  const currentUserFolloweds = useSelector(state => state.follows)
  console.log('currentUserFolloweds:', currentUserFolloweds)

  const followeObj = Object.values(currentUserFolloweds)
  console.log('followeObj:', followeObj)


  useEffect(() => {
    dispatch(allPost());
    dispatch(userFollowers(user.id))
  }, [dispatch, user]);

  return (
    <div className="mainPageDivs">
    <div className="mainHomeDiv">
{/* <h1>hello</h1> */}
      {/* <h1>Coming from HomeFeed</h1> */}
      {allPosts.map((post) => (
        <div
        className="postsDiv"
        key={post.id}

        >
          {/* {userARr.map((usr) => (
            <h1>usr.username</h1>
          ))} */}

          <SpecificPageModel modelInfo={post}/>

          <ul className="postInfo">

            <li>{post.caption_content}</li>
            <li>{post.location}</li>
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
