import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../store/session";
import UpdateCommentModal from "../EditCommentModal/editCommentModal";
import { deleteCommentThunk } from "../../../../store/comments";

const MouseOverComment = ({comment}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const all_users = useSelector(state => state.session.allUsers)
    const [icons, setIcons] = useState(false)

    useEffect(() => {
        dispatch(getUsers())
    },[dispatch])

    const handleMouseOver = () => {
        setIcons(true)
    }

    const handleMouseLeave = () => {
        setIcons(false)
    }

    return (
        <>
          <div className="commentDivMainPostModal" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <div className="profileCommentUsernameSection">
              <img
                className="imageForIndividualComments"
                src={all_users[comment.user_id].profile_img_src}
                alt=""
                />
              <div className="usernameCommentOnCommentSection">
        
              <span className="usernameOnSection">

                  {all_users[comment.user_id].username}
              </span>
                  {comment.comment_content}

              </div>
            </div>
            {(user.id === comment.user_id) && icons ? <div className="deleteEditCommentDiv">
                {comment.user_id === user.id && (
                    <i className="fa-regular fa-trash-can"
                    onClick={() => dispatch(deleteCommentThunk(comment.id))}
                    ></i>
                )}

                {comment.user_id === user.id && (
                    <UpdateCommentModal
                    className=""
                    modalInfo={comment}
                    />
                    )}
            </div>: ''}

          </div>
        </>
    )
}

export default MouseOverComment;
