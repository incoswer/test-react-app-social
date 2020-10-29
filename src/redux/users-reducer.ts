import {usersAPI} from "../api/api";
import {updateObjectArray} from "../utils/objects-helpers";
import {userType} from "../types/types";
import {appStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USER = 'SET_USER';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const REWIED_USERS = 'REWIED_USERS';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOOGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<userType>,
    pageSize: 5,
    totalUsersCount: 19,
    currentPage: 1,
    isFetching: true,
    StateTrue: false,
    followingInProgress: [] as Array<number>
};
type initialStateType= typeof initialState

const usersReducer = (state = initialState, action:actionsTypes):initialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users:updateObjectArray(state.users,action.userId,'id',{followed:true})
            };
        case UNFOLLOW:
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
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

type actionsTypes = followSuccessType | unfollowSuccessType | setUserType | setCurrentPageType
    | setTotalUserCountType |setIsFecthingType | rewiedUsersType | toggleFollowingProgress

type followSuccessType={
    type: typeof FOLLOW
    userId: number
}
export const FollowSuccess = (userId:number):followSuccessType => ({type: FOLLOW, userId});
type unfollowSuccessType={
    type: typeof UNFOLLOW
    userId: number
}
export const UnFollowSuccess = (userId:number):unfollowSuccessType => ({type: UNFOLLOW, userId});
type setUserType={
    type: typeof SET_USER
    users: Array<userType>
}
export const setUser = (users: Array<userType>):setUserType => ({type: SET_USER, users});
type setCurrentPageType={
    type: typeof SET_CURRENT_PAGE
    currentPage:number
}
export const setCurrentPage = (currentpage:number):setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage: currentpage})
type setTotalUserCountType={
    type:typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalUserCount = (totalCount:number):setTotalUserCountType => ({type: SET_TOTAL_COUNT, totalCount: totalCount});
type setIsFecthingType={
    type:typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching:boolean):setIsFecthingType => ({type: TOGGLE_IS_FETCHING, isFetching});
type rewiedUsersType={
    type: typeof REWIED_USERS
    StateTrue:boolean
}
export const rewiedUsers = (StateTrue:boolean):rewiedUsersType => ({type: REWIED_USERS, StateTrue: StateTrue});
type toggleFollowingProgress ={
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching:boolean,
    userId:number
}
export const toogleFollowingProgress = (isFetching:boolean, userId:number):toggleFollowingProgress => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

type getStateType=()=>appStateType
type dispatchType = Dispatch<actionsTypes>
type thunkType = ThunkAction<any, appStateType, any, actionsTypes>

export const requestUsers = (currentPage:number, pageSize:number):thunkType => {
    return (dispatch,getState) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        usersAPI.getUsers(currentPage, pageSize).then((data:any) => {
            dispatch(setIsFetching(false));
            dispatch(setUser(data.items));
            dispatch(setTotalUserCount(data.totalCount));
        })
    }
}

const _followUnfollowFlow = async (dispatch:dispatchType,userId:number,apiMethod:any,actionCreator:(userId:number)=>followSuccessType | unfollowSuccessType)=>{
    dispatch(toogleFollowingProgress(true,userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toogleFollowingProgress(false, userId));
}
export const follow = (userId:number):thunkType=> {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(userId),FollowSuccess)
    }
}
export const unFollow = (userId:number):thunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch,userId,usersAPI.unFollow.bind(userId),UnFollowSuccess)
    }
}
export default usersReducer;
