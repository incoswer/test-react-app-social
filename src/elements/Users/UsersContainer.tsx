import React from 'react';
import {connect, MapStateToProps} from "react-redux";
import {
    follow, FollowSuccess, requestUsers, rewiedUsers,
    setCurrentPage,
    setIsFetching,
    setTotalUserCount,
    setUser, toogleFollowingProgress,
    unFollow, UnFollowSuccess,
} from "../../redux/users-reducer";
import Users from "./Users";
import PreLoader from '../common/PreLoader/PreLoader'
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFething,
    getPageSize,
    getStateTrue,
    getTotalUsersCount, ugetUsers,
} from "../../redux/users-selectors";
import {userType} from "../../types/types";
import {appStateType} from "../../redux/redux-store";

type ownPropsType = {
    pageTitle: string
}
type mapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    users: Array<userType>,
    StateTrue: any,
    followingInProgress: Array<number>,
}
type mapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void,
}
type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

class UsersApiComponent extends React.Component<propsType> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (item: any) => {
        this.props.getUsers(item, this.props.pageSize);
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.StateTrue}
            {this.props.isFetching ? <PreLoader/> :
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       follow={this.props.follow}
                       unFollow={this.props.unFollow}
                       followingInProgress={this.props.followingInProgress}
                />}
        </>
    }
}

const mapStateToProps = (state: any): mapStatePropsType => {
    return {
        users: ugetUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFething(state),
        StateTrue: getStateTrue(state),
        followingInProgress: getFollowingInProgress(state),
    };
}

export default compose(
    connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>
    (mapStateToProps, {
        getUsers: requestUsers,
        follow,
        unFollow
    }),
    withRouter,
    withAuthRedirect
)(UsersApiComponent)

