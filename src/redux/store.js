import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, title: "hello", likesCount: 15},
                {id: 2, title: "hi", likesCount: 1},
                {id: 3, title: "ell", likesCount: 4},
                {id: 4, title: "oh no", likesCount: 6},
                {id: 5, title: "zerro", likesCount: 1},
            ],
            newPostText: ''
        },

        MessagePage: {
            messages: [
                {id: 1, message: "hello"},
                {id: 2, message: "ivan"},
                {id: 3, message: "ell"},
                {id: 4, message: "ivanovich"},
                {id: 5, message: "zerro"}
            ],

            dialogs: [
                {id: 1, dialog: "nikolayi"},
                {id: 2, dialog: "ivan"},
                {id: 3, dialog: "ivanov"},
                {id: 4, dialog: "ivanovich"},
                {id: 5, dialog: "zerro"}
            ],

            newMessageBody: '',
        },
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log(this._state)
    },
    addPost() {
        let newPost = {
            id: 6,
            title: this._state.profilePage.newPostText,
            likesCount: 0,
        }
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber();
    },
    updateNewPostText(text) {
        this._state.profilePage.newPostText = text;
        this._callSubscriber();
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.MessagePage = dialogsReducer(this._state.MessagePage, action);
        this._callSubscriber(this._state);
    },
}

export default store;
