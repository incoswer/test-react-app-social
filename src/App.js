import React from 'react';
import './App.css';
import Navigation from './elements/Navigation/Navigation.jsx';
import ProfileContainer from './elements/Profile/ProfileContainer.jsx';
import {Route, withRouter} from 'react-router-dom';
import Music from './elements/Music/Music';
import News from './elements/News/News';
import Seetings from './elements/Seetings/Seetings';
import DialogsContainer from "./elements/dialogs/DialogsContainer";
import UsersContainer from "./elements/Users/UsersContainer";
import HeaderContainer from "./elements/Header/HeaderContainer";
import LoginPAge from "./elements/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import PreLoader from "./elements/common/PreLoader/PreLoader";
import {initializedApp} from "./redux/app-reducer";


class App extends React.Component {
    componentDidMount() {
        this.props.initializedApp();
    }

    render() {
        if(!this.props.initialized){

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
                    <Route path="/users" render={() => <UsersContainer pageTitle={'Samurai we have a city to burn'}/>}/>
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
    initialized:state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps,{initializedApp}))(App);
