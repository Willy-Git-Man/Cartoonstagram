const GET_POSTS = 'posts/GET_POSTS';
const CREATE_POST = 'posts/CREATE_POST';


const getPost = (allpost) => ({
    type: GET_POSTS,
    allPost: allpost
})


const createPost = (post) => ({
    type: CREATE_POST,
    newPost: post
})


export const allPost = () => async(dispatch) => {
    const response = await fetch('/posts');

    if(response.ok) {
        const posts = await response.json();
        dispatch(getPost(posts))
    }
    return response;

}

export const makePost = (post) => async(dispatch) => {
    console.log('JHEll', post)
    const response = await fetch('/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post)
    })

    if(response.ok){
        const newPost = await response.json();
        dispatch(createPost(newPost))
    }
    return response;
}

const initialState = {posts: []}

export default function postReducer(state = initialState, action) {
    let newState;
    switch (action.type){
        case GET_POSTS:
            newState = {...state}
            action.allPost.forEach(post => newState[post.id] = post)
            newState.posts = [...action.allPost]
            return newState
        case CREATE_POST:
            newState={...state}
            newState.posts = [...newState.posts, action.newPost];
            return newState
        default:
            return state
    }
}
