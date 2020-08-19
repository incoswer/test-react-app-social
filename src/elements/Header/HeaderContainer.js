import React from 'react';
import Header from "./Header";
import css from "./Header.module.css";
import * as axios from "axios";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer";
import {authAPI} from "../../api/api";


class HeaderContainer extends React.Component {

    render() {
        return (
            <div className={css.header}>
                <Header {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    email: state.auth.email,
    userId: state.auth.userId,
})
export default connect(mapStateToProps, {logout})(HeaderContainer);