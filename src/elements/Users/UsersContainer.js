import React from 'react';
import {connect} from "react-redux";
import {
    follow, FollowSuccess, requestUsers, getUsersThunkCreator, rewiedUsers,
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
    getTotalUsersCount, ugetUsers, ugetUsersSuper
} from "../../redux/users-selectors";

class UsersApiComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers(this.props.currentPage,this.props.pageSize);
        /*this.props.setIsFetching(true);
        this.props.rewiedUsers(false);
        usersAPI.getUsers(this.props.currentPage,this.props.pageSize).then(data => {
            this.props.rewiedUsers(true);
            this.props.setIsFetching(false);
            this.props.setUser(data.items);
            this.props.setTotalUserCount(data.totalCount);
        })
    }*/

    }

    componentWillUnmount() {

    }

    onPageChanged = (item) => {
        this.props.getUsers(item,this.props.pageSize);
/*        this.props.setIsFetching(true);
        this.props.rewiedUsers(false);
        this.props.setCurrentPage(item);
        usersAPI.getUsers(item,this.props.pageSize).then(data => {
            this.props.rewiedUsers(true);
            this.props.setIsFetching(false);
            this.props.setUser(data.items);
        })*/
    }

    render() {
        let jsx = <Users totalUsersCount={this.props.totalUsersCount}
                         pageSize={this.props.pageSize}
                         currentPage={this.props.currentPage}
                         onPageChanged={this.onPageChanged}
                         users={this.props.users}
                         follow={this.props.follow}
                         unFollow={this.props.unFollow}
                         toogleFollowingProgress={this.props.toogleFollowingProgress}
                         followingInProgress={this.props.followingInProgress}
        />

        return <>
            {this.props.StateTrue }
            {this.props.isFetching ? < PreLoader/> : null}
            {jsx}
        </>
    }
}

/*const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        StateTrue: state.usersPage.StateTrue,
        followingInProgress: state.usersPage.followingInProgress,
    };
}*/
const mapStateToProps = (state) => {
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
    connect(mapStateToProps, {
    FollowSuccess,
    UnFollowSuccess,
    setUser,
    setCurrentPage,
    setTotalUserCount,
    setIsFetching,
    rewiedUsers,
    toogleFollowingProgress,
    getUsers: requestUsers,
    follow,
    unFollow}),
    withRouter,
    withAuthRedirect

)(UsersApiComponent)

