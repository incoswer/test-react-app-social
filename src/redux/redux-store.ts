import {applyMiddleware, combineReducers, createStore} from "redux";
import sidebarReducer from "./sidebar-reducer";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    MessagePage: dialogsReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth:authReducer,
    form: formReducer,
    app:appReducer
});

type rootReducerType = typeof reducers
export type appStateType = ReturnType<rootReducerType>



let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;

export default store;