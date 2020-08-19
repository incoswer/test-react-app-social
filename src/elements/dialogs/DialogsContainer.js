import React from 'react';
import css from './Dialogs.module.css';
import {NavLink, Redirect} from 'react-router-dom';
import Message from './Message/Message';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {

    return {
        dialogsItems: state.MessagePage,
        isAuth: state.auth.isAuth,

    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        onClick: (message) => {
            dispatch(sendMessageCreator(message));
        }
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
