import axios from "axios";
import {profileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        'API-KEY':'10ee76eb-41b0-4764-947b-2a0f9316a198'
    }
})


export const usersAPI = {
    getUsers (currentPage =1,pageSize = 10)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`, {
            withCredentials: true
        }).then(responce=>{
            return responce.data;
        });
    },
    follow(userId:number){
        return instance.post(`follow/${userId}`)
    },
    unFollow(userId:number){
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId:number){
        console.log('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId:number){
        return instance.get(`profile/` + userId)
    },
    getStatus(userId:number){
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status:string){
        return instance.put(`profile/status`,{
            status:status
        })
    },
    savePhoto(file:any){
        const formData = new FormData()
        formData.append('image',file)
        return instance.put(`profile/photo`,formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    },
    saveProfile(profile:profileType){
        return instance.put(`profile`,profile)
    }
}

export enum resultCodeEnum{
    Success=0,
    Error=1,
}

export enum resultCodeCaptcha{
    CaptchaIsRequired=10
}

type meResponceType={
    data:{
        id:number,
        email:string,
        login:string
    },
    resultCode:resultCodeEnum,
    messages:Array<string>
}

type loginResponceType={
    resultCode:resultCodeEnum | resultCodeCaptcha,
    messages:Array<any> | string,
    data:{
        userId:number
    }
}
export const authAPI ={
    me(){
        return instance.get<meResponceType>(`auth/me`).then(responce=>responce.data)
    },
    login(email:string,password:string,rememberMe = false,captcha:null | string=null){
        return instance.post<loginResponceType>(`auth/login`).then(res=>res.data)
    },
    logout(){
        return instance.delete(`auth/login`)
    },
}
export const securityAPI ={
    getCaptchaUrl(){
        return instance.get(`security/get-captcha-url`)
    },
}
