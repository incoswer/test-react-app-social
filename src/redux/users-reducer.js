import {usersAPI} from "../api/api";
import {updateObjectArray} from "../utils/objects-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USER = 'SET_USER';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const REWIED_USERS = 'REWIED_USERS';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'TOOGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 19,
    currentPage: 1,
    isFetching: true,
    StateTrue: false,
    followingInProgress: []
};
const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users:updateObjectArray(state.users,action.userId,'id',{followed:true})

            };

        case UNFOLLOW:
            debugger
            return {
                ...state,
                users:updateObjectArray(state.users,action.userId,'id',{followed:false})
            };
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage};
        }
        case SET_USER: {
            return {...state, users: action.users};
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOOGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id != action.userId)]
            }
        }
        case REWIED_USERS: {
            return {...state, StateTrue: action.StateTrue}
        }
        default:
            return state;
    }
}

export const FollowSuccess = (userId) => ({type: FOLLOW, userId});
export const UnFollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUser = (users) => ({type: SET_USER, users});
export const setCurrentPage = (currentpage) => ({type: SET_CURRENT_PAGE, currentPage: currentpage});
export const setTotalUserCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount: totalCount});
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const rewiedUsers = (StateTrue) => ({type: REWIED_USERS, StateTrue: StateTrue});
export const toogleFollowingProgress = (isFetching, userId) => ({
    type: TOOGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const requestUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setIsFetching(false));
            dispatch(setUser(data.items));
            dispatch(setTotalUserCount(data.totalCount));
        })
    }
}

const followUnfollowFlow = async (dispatch,userId,apiMethod,actionCreator)=>{
    dispatch(toogleFollowingProgress(true,userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toogleFollowingProgress(false, userId));
}
export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(userId),FollowSuccess)
    }
}
export const unFollow = (userId, pageSize) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch,userId,usersAPI.unFollow.bind(userId),UnFollowSuccess)
    }
}
export default usersReducer;
