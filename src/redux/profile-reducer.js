import * as axios from "axios";
import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

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
    ],
    newPostText: '',
    profile: null,
    status: '',
};
const profileReducer = (state = initialState, action) => {
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
            return {...state, profile:{...state.profile,photos:action.photos}}
        }
        default:
            return state;
    }
}
export const addPostActionCreator = (post) => {
    return {
        type: ADD_POST,
        post: post
    }
}
export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text: text,
    }
}
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)

    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));

}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile) => async (dispatch,getState) => {
    const userId= getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
    else{
        dispatch(stopSubmit('ProfileDataForm',{_error:response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;
