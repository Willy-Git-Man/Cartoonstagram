

const GET_COMMENTS = 'comments/GET_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'

// hi
const getComments = (postComments) => ({
    type: GET_COMMENTS,
    postComments
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
})

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
})

export const allComments = (id) => async(dispatch) => {
    const response = await fetch(`/comments/${id}`);

    if(response.ok) {
        const postComments = await response.json();
        dispatch(getComments(postComments))
    }
    return response;
}

export const makeComment = (comment) => async(dispatch) => {
    console.log('comment', comment)
    console.log('comment.post_id:', comment.post_id)

    // const response = await fetch(`/comments/${comment.post_id}`, {
    const response = await fetch(`/comments`, {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })

    if(response.ok){
        const newComment = await response.json();
        dispatch(createComment(newComment))
    }
    return response;
}

export const deleteCommentThunk = (commentId) => async(dispatch) => {
    const response = await fetch(`/comments/${commentId}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })

    if(response.ok){
        const comment = await response.json()
        dispatch(deleteComment(comment))
    }
}

export const updateCommentThunk = (updatedComment) => async (dispatch) => {
  const response = await fetch(`/comments/${+updatedComment.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedComment),
  });
  if (response.ok) {
    const updatedCommentRequest = await response.json();
    dispatch(updateComment(updatedCommentRequest));
    return updatedCommentRequest
  }
};

const initialState = {comments: {}}

export default function commentsReducer(state = initialState, action) {
    let newState;
    switch (action.type){
        case GET_COMMENTS:
          newState = {...state, comments: {}}
          console.log('the action',action)
          console.log('the action.postComments.comments',action.postComments.comments)
          action.postComments.comments.forEach((comment) => newState.comments[comment.id] = comment)
          return newState;
        case CREATE_COMMENT:
          newState= {...state, comments: {...state.comments} };
          newState.comments[action.comment.id] = {...action.comment}
          return newState;

        case DELETE_COMMENT:
          newState= {...state, comments: {...state.comments}};
          const id = action.comment
          delete newState.comments[id]
          return newState;

          case UPDATE_COMMENT:
            newState = {...state, comments: {...state.comments}};
            newState.comments[action.comment.id] = {...action.comment}
            return newState

        default:
            return state
    }
}
