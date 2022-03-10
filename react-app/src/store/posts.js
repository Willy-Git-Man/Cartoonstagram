const GET_POSTS = 'posts/GET_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const DELETE_POST = 'posts/DELETE_POST';
const EDIT_POST = 'posts/EDIT_POST';

const getPost = (allpost) => ({
    type: GET_POSTS,
    allPost: allpost
})


const createPost = (post) => ({
    type: CREATE_POST,
    newPost: post
})

const deletePost = (post) => ({
    type: DELETE_POST,
    post
})

const edit = (editPost) => ({
    type: EDIT_POST,
    editPost
})

export const allPost = () => async(dispatch) => {
    const response = await fetch('/posts');

    if(response.ok) {
        const posts = await response.json();
        dispatch(getPost(posts))
    }
    return response;

}

export const makePost = (formData) => async(dispatch) => {

    const response = await fetch('/posts', {
        method: 'POST',
        body: formData
    })

    if(response.ok){
        const newPost = await response.json();
        dispatch(createPost(newPost))
        return 'Success';
    }
}

export const deleteAPost = (postId) => async(dispatch) => {
    const response = await fetch(`/posts/${postId}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })

    if(response.ok){
        const post = await response.json()
        dispatch(deletePost(post))
    }
}

export const editPost = (post, postId) => async (dispatch) => {
    console.log('coming from edit post action', post)
    const response = await fetch(`/posts/${postId}/update`, {
        method: 'POST',
        body: post
    });

    if (response.ok) {
        const editedPost = await response.json();
        console.log(editedPost, 'EDITED POST')
        dispatch(edit(editedPost));
        return 'Success!'
    }
}

const initialState = {posts: []}

export default function postReducer(state = initialState, action) {
    let newState;
    switch (action.type){
        case GET_POSTS:
            newState = {...state}
            newState.posts = [...action.allPost.posts]
            newState.posts.forEach(post => newState[post.id] = post)
            return newState
        case CREATE_POST:
            newState={...state}
            newState.posts = [action.newPost, ...newState.posts];
            return newState
        case DELETE_POST:
            newState = {...state};
            delete newState[action.post.id];
            newState.posts.forEach((post, i)=> {
                if (post.id === action.post.id){
                    newState.posts.splice(i, 1);
                }
            })
            newState.posts = [...newState.posts];
            return newState
        case EDIT_POST:
            newState = { ...state }
            newState[action.editPost.id] = {...action.editPost}
            newState.posts.forEach((post, i) => {
                if (post.id === action.editPost.id) {
                    newState.posts.splice(i, 1);
                }
            })
            newState.posts = [{...action.editPost}, ...newState.posts]
            return newState
        default:
            return state
    }
}
