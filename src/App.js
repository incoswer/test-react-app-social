import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './elements/Navigation/Navigation.jsx';
import ProfileContainer from './elements/Profile/ProfileContainer.jsx';
import Dialogs from './elements/dialogs/Dialogs';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import Music from './elements/Music/Music';
import News from './elements/News/News';
import Seetings from './elements/Seetings/Seetings';
import DialogsContainer from "./elements/dialogs/DialogsContainer";
import UsersContainer from "./elements/Users/UsersContainer";
import HeaderContainer from "./elements/Header/HeaderContainer";
import LoginPAge from "./elements/Login/Login";
import {connect} from "react-redux";
import {getAuthUserData} from "./redux/auth-reducer";
import {compose} from "redux";
import PreLoader from "./elements/common/PreLoader/PreLoader";
import {inizilizeApp} from "./redux/app-reducer";


class App extends React.Component {
    componentDidMount() {
        this.props.inizilizeApp();
    }

    render() {
        if(!this.props.inizilized){

            return <PreLoader />
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navigation/>
                <div className='app-wrapper-content'>
                    <Route path="/dialogs"
                           render={() => <DialogsContainer/>}/>
                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route exact path="/login" component={LoginPAge}/>
                    <Route exact path="/music" component={Music}/>
                    <Route path="/news" component={News}/>
                    <Route path="/seetings" component={Seetings}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>({
    inizilized:state.app.inizilized
})

export default compose(
    withRouter,
    connect(mapStateToProps,{inizilizeApp}))(App);
