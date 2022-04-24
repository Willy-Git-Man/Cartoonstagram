import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPost } from "../store/posts";
import "./HomeFeed.css";
import { userFollowers } from "../store/followers";

import React from "react";
import HomeSpecificPageModel from "./Modals/PostsForm/SpecificPost/HomeSpecificPageModal";
import UsersList from "./UserList/UsersList";

import { NavLink } from "react-router-dom";

const HomeFeed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allPosts = useSelector((state) => state.post.posts);
  const allUsers = useSelector((state) => state.session.allUsers);

  useEffect(() => {
    dispatch(allPost());
    dispatch(userFollowers(user.id));
  }, [dispatch, user]);

  return (
    <div className="mainPageDivs">
      <div className="mainHomeDiv">

        {allPosts.map((post) => (
          <div className="postsDiv" key={post.id}>
          <NavLink className="postNavLink" to={`/users/${allUsers[post.user_id].id}`}>
            <div className="profilePicUsernameModalFeed">
                <img className='imageOnMainPostModal' src={allUsers[post.user_id].profile_img_src} alt=''/>
                <div className="usernameAndLocation">
                  <span className="usernameOnSection">{allUsers[post.user_id].username}</span>
                  <div className="locationOnThePostModal">{post.location}</div>
              </div>
            </div>
            </NavLink>
            <HomeSpecificPageModel modelInfo={post} />

          <div className="profileCommentUsernameSectionHomeFeed">
          <img className='imageOnMainPostModal' src={allUsers[post.user_id].profile_img_src} alt=''/>
          <div className='usernameCommentOnCommentSection'>
            <span className="usernameOnSection">{allUsers[post.user_id].username}</span>
            <span>{post.caption_content}</span>

          </div>
        </div>
          </div>
        ))}
      </div>

      {/* <div className="followerDivRight"> */}
        <div className="followerMap">
          <h3 className="followDivH1">Cartoonstagram Users:</h3>
          <UsersList />
        </div>
      {/* </div> */}
    </div>
  );
};

export default HomeFeed;
