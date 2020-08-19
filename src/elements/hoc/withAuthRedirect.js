import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsRedirect = (state) => ({
    isAuth:state.auth.isAuth,
})

export const withAuthRedirect = (Component)=>{
    class RedirectComponent extends React.Component{
        render() {
            if(!this.props.isAuth) return <Redirect to={'/login'}></Redirect>;
            return <Component {...this.props} />
        }
    }
    let AuthRedirectComponent= connect(mapStateToPropsRedirect)(RedirectComponent);
    return AuthRedirectComponent
}