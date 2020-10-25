import {createSelector} from "reselect";

const ugetUsersCelector = (state:any)=>{
    return state.usersPage.users
}

export const ugetUsers = createSelector(ugetUsersCelector,(users)=>{
    return users.filter((u:any)=>true)
})
export const getPageSize = (state:any)=>{
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state:any)=>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state:any)=>{
    return state.usersPage.currentPage
}
export const getIsFething = (state:any)=>{
    return state.usersPage.isFetching
}
export const getStateTrue = (state:any)=>{
    return state.usersPage.StateTrue
}
export const getFollowingInProgress = (state:any)=>{
    return state.usersPage.followingInProgress
}
