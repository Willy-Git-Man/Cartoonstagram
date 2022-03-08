const GET_LIKES = 'likes/GET_LIKES';
const CREATE_LIKE = 'likes/CREATE_LIKE';
const REMOVE_LIKE = 'likes/REMOVE_LIKE'

const getLike = (allLike) => ({
    type: GET_LIKES,
    allLike: allLike
})


const createLike = (newLike) => ({
    type: CREATE_LIKE,
    newLike
})

const removeLike = (oldLike) => ({
    type: CREATE_LIKE,
    oldLike
})



export const allLike = (id) => async(dispatch) => {
    const response = await fetch(`/likes/${id}`);

    if(response.ok) {
        const posts = await response.json();
        dispatch(getLike(posts))
    }
    return response;

}

export const makeLike = (like) => async(dispatch) => {
    const response = await fetch(`/likes/${like}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(like)
    })

    if(response.ok){
        const newLike = await response.json();
        dispatch(createLike(newLike))
    }
    return response;
}

export const deleteLike = (like) => async (dispatch) => {
    const response = await fetch(`likes/${like}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      dispatch(removeLike());
    }
  };

const initialState = {likes: []}

export default function likeReducer(state = initialState, action) {
    let newState;
    switch (action.type){
        case GET_LIKES:
            console.log(action, 'what is the action')
            newState = {...state}
            newState.likes.forEach(post => delete newState[post.id] )

            newState.likes = [...action.allLike.likes]
            newState.likes.forEach(post => newState[post.id] = post)
            return newState
        case CREATE_LIKE:
            newState={...state}
            newState.likes = [...newState.likes, action.newPost];
            return newState

        case REMOVE_LIKE:
            newState = {...state}
            delete newState[action.like.id]
            return newState

        default:
            return state
    }
}