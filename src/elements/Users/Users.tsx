import React from "react";
import css from "./users.module.css";
import Imsage from "../../images/smalluserimage.jpg";
import {NavLink} from "react-router-dom";
import Paginator from "./Paginator";
import {userType} from "../../types/types";

type propsType={
    totalUsersCount:number,
    pageSize:number,
    currentPage:number,
    onPageChanged: (pageNumber:number)=>void,
    users:Array<userType>,
    followingInProgress:any,
    unFollow:(userId:number)=> void,
    follow:(userId:number)=>void,
}

const Users:React.FC<propsType> = (props) => {
    return <div>
        <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   portionSize={10}/>
        {props.users.map((user:any) => <div className={css.user} key={user.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : Imsage}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={props.followingInProgress.some((id:number) => id === user.id)} onClick={() => {
                                props.unFollow(user.id);

                            }}>unfollow</button>
                            : <button disabled={props.followingInProgress.some((id:number) => id === user.id)} onClick={() => {
                                props.follow(user.id);
                            }}>follow</button>}
                    </div>
                    <div>
                     {user.name}
                     </div>
                    <div>
                     {user.status}
                     </div>
                </span>
        </div>)}
    </div>
}


export default Users
