import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { makePost, allPost } from "../store/posts";
import "./HomeFeed.css";
import { userFollowers } from "../store/followers";

import React from "react";
import SpecificPageModel from "./Modals/PostsForm/SpecificPost/SpecificPostModel";

const HomeFeed = () => {


  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const allPosts = useSelector((state) => state.post.posts);


  useEffect(() => {
    dispatch(allPost());
    dispatch(userFollowers(user.id))
  }, [dispatch, user]);

  return (
    <div className="mainPageDivs">

    <div className="mainHomeDiv">
      <h1>Coming from HomeFeed</h1>
      {allPosts.map((post) => (
        <div
        className="postsDiv"
        key={post.id}

        >
          <SpecificPageModel modelInfo={post}/>
          <ul>
            <li>{post.id}</li>
            <li>{post.user_id}</li>
            <li>{post.caption_content}</li>
            <li>{post.location}</li>
          </ul>

        </div>
      ))}
    </div>

    <div className="followerDiv">
      <p>HELLO WORLD</p>
      </div>
      </div>
  );
};

export default HomeFeed;
