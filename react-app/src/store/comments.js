const GET_COMMENTS = 'comments/GET_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// hi
const getComment = (allComments) => ({
    type: GET_COMMENTS,
    allComments: allComments
})


const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
})

export const allComments = () => async(dispatch) => {
    const response = await fetch('/comments');

    if(response.ok) {
        const comments = await response.json();
        dispatch(getComment(comments))
    }
    return response;

}

export const makeComment = (comment) => async(dispatch) => {
    console.log('JHEll', comment)
    const response = await fetch('/comments', {
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

const initialState = {comments: []}

export default function commentsReducer(state = initialState, action) {
    let newState;
    switch (action.type){
        // case GET_COMMENTS:
        //     newState = {...state}
        //     newState.posts = [...action.allPost.posts]
        //     newState.posts.forEach(post => newState[post.id] = post)
        //     return newState
        // case CREATE_COMMENT:
        //     newState={...state}
        //     newState.posts = [action.newPost, ...newState.posts];
        //     return newState
        // case DELETE_COMMENT:
        //     newState = {...state};
        //     delete newState[action.post.id];
        //     newState.posts.forEach((post, i)=> {
        //         if (post.id === action.post.id){
        //             newState.posts.splice(i, 1);
        //         }
        //     })
        //     newState.posts = [...newState.posts];
        //     return newState
        default:
            return state
    }
}
