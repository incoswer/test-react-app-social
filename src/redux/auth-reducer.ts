import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_UDER_DATA = 'my-app/auth/SET_UDER_DATA';
const GET_CAPTCHAURL_SUCCESS = 'my-app/auth/GET_CAPTCHAURL_SUCCESS';

/*type initialStateType={
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean | null,
    captchaUrl:string | null
}*/
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean | null,
    captchaUrl:null as string | null
};

export type initialStateType = typeof initialState

const authReducer = (state = initialState, action:any):initialStateType => {
    switch (action.type) {
        case SET_UDER_DATA:
            return {
                ...state,
                ...action.payload,
            };

        case GET_CAPTCHAURL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.payload
            }
        default:
            return state;
    }
}

type inputSetAuthUserDataType={
    userId:number | null,
    login: string | null,
    email:string | null,
    isAuth:boolean | null
}
type setAuthUserData ={
    type: typeof SET_UDER_DATA,
    payload: inputSetAuthUserDataType
}
export const setAuthUserData = (userId:number | null, login:string | null, email:string | null, isAuth:boolean | null):setAuthUserData => ({
    type: SET_UDER_DATA,
    payload: {userId, email, login, isAuth}
});

type getCaptchaUrlSuccessType={
    type:typeof GET_CAPTCHAURL_SUCCESS,
    payload: string
}

export const getCaptchaUrlSuccess = (captchaUrl:string):getCaptchaUrlSuccessType => ({
    type: GET_CAPTCHAURL_SUCCESS,
    payload: captchaUrl
});


export const getAuthUserData = () => async (dispatch:any) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const login = (email:string, password:string, rememberMe:boolean,captcha:string) => async (dispatch:any) => {
    let response = await authAPI.login(email, password, rememberMe,captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if(response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }

}
export const getCaptchaUrl = () => async (dispatch:any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }

}

export default authReducer;
