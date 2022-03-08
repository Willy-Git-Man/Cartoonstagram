const GET_FOLLOWERS = 'followers/GET_FOLLOWERS'
const FOLLOW = 'followers/FOLLOW'
const REMOVE_FOLLOWER = 'followers/UNFOLLOW'

const getFollowers = (followeds) => ({
    type: GET_FOLLOWERS,
    followeds
})

const follow = (followed) => ({
    type: FOLLOW,
    followed
})

const unfollow = (user) => ({
    type: REMOVE_FOLLOWER,
    user
})

export const userFollowers = (userId) => async(dispatch) => {
    const response = await fetch(`/follows/${userId}`)
    if (response.ok) {
        const followeds = await response.json();

        dispatch(getFollowers(followeds))
    }
}

export const addFollower = (userId) => async(dispatch) => {
    const response = await fetch(`/follows/${userId}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    if (response.ok) {
        const user = await response.json()
        dispatch(follow(user))
    }
}

export const removeFollower = (userId) => async(dispatch) => {
    const response = await fetch(`/follows/${userId}/unfollow`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    if (response.ok) {
        const user = await response.json()
        dispatch(unfollow(user))
    }
}

const initialState = {followeds: []};

export default function followReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_FOLLOWERS:
            newState = {...state}
            newState.followeds.forEach(followed => delete newState[followed.id])
            newState.followeds = [...action.followeds.follows]
            newState.followeds.forEach(followed => newState[followed.id] = followed)
            return newState
        case FOLLOW:
            newState = {...state}
            newState.followeds.forEach(followed => delete newState[followed.id])
            newState.followeds = [...newState.followeds, action.followed]
            newState.followeds.forEach(followed => newState[followed.id] = followed)
            return newState
        case REMOVE_FOLLOWER:
            newState = {...state}
            delete newState[action.user.id]
            return newState
        default:
            return state
    }
}
