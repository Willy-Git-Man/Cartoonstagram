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
    const response = await fetch('/api/posts');

    if(response.ok) {
        const posts = await response.json();
        dispatch(getPost(posts))
    }

}

const initialState = {posts: {}}

export default function postReducer(state = initialState, action) {
    switch (action.type){
        let newState;
        case GET_POSTS:
            newState = {...state}
            newState.posts = [...action.allPost]
            return newState
    }
}
