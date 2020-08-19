import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";

const SET_UDER_DATA = 'SET_UDER_DATA';
const UNFOLLOW = 'UNFOLLOW';
const INIZIALIZED = 'INIZIALIZED'

let initialState = {
    inizilized:false,

};
const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INIZIALIZED:
            return {
                ...state,
                inizilized:true,
            };


        default:
            return state;
    }
}

export const inizilizedSuccess = () => ({type: INIZIALIZED});
export const inizilizeApp = () =>(dispatch)=>{

    let promise=dispatch(getAuthUserData());
    promise.then(()=>{
        dispatch(inizilizedSuccess())

    })
}
export const login = (email,password,rememberMe)=>(dispatch)=>{
    authAPI.login(email,password,rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            }
            else{
                let message = response.data.messages.length > 0 ? response.data.messages[0] :'Some error';
                dispatch(stopSubmit('login',{_error:message}));
            }
        })
}
export const logout = ()=>(dispatch)=>{
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData(null,null,null,false));
            }
        })
}

export default appReducer;
