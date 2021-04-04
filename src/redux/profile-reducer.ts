import {profileAPI, resultCodeEnum, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postType, profileType} from "../types/types";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'
let initialState = {
    posts: [
        {id: 1, title: "hello", likesCount: 15},
        {id: 2, title: "hi", likesCount: 1},
        {id: 3, title: "ell", likesCount: 4},
        {id: 4, title: "oh no", likesCount: 6},
        {id: 5, title: "zerro", likesCount: 1},
    ] as Array<postType>,
    profile: null as profileType | null,
    status: '',
    newPostText: ''
};
export type initialStateType= typeof initialState

const profileReducer = (state = initialState, action:any):initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 6, title: action.post, likesCount: 0}],

            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.text
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile:{...state.profile,photos:action.photos}as profileType}
        }
        default:
            return state;
    }
}
type addPostActionCreatorType={
    type: typeof ADD_POST,
    post:string
}

export const addPostActionCreator = (post:string):addPostActionCreatorType => {
    return {
        type: ADD_POST,
        post: post
    }
}
export const updateNewPostTextActionCreator = (text:string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text: text,
    }
}
type setUserProfileType={
    type: typeof SET_USER_PROFILE,
    profile:profileType
}

export const setUserProfile = (profile:profileType):setUserProfileType => ({type: SET_USER_PROFILE, profile})
type setStatusType={
    type: typeof SET_STATUS,
    status:string
}

export const setStatus = (status:string):setStatusType => ({type: SET_STATUS, status})
type savePhotoSuccess ={
    type: typeof SAVE_PHOTO_SUCCESS,
    photos:photosType
}
export const savePhotoSuccess = (photos:photosType):savePhotoSuccess => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId:number) => async (dispatch:any) => {
    let response = await usersAPI.getProfile(userId)

    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));

}

export const updateStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === resultCodeEnum.Success) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === resultCodeEnum.Success) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile:any) => async (dispatch:any,getState:any) => {
    const userId= getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === resultCodeEnum.Success) {
        dispatch(getUserProfile(userId));
    }
    else{
        dispatch(stopSubmit('ProfileDataForm',{_error:response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;
