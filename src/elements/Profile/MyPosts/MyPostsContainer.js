import React from 'react';
import {updateNewPostTextActionCreator, addPostActionCreator} from '../../../redux/profile-reducer';
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";
import {connect} from "react-redux";

const mapStateToProps = (state) =>{
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        updateNewPostText: (text)=>{
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },
        addPost: (post)=>{
            dispatch(addPostActionCreator(post));
        }
    }

}
const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);
export default MyPostsContainer;