const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType={
    id:number,
    message:string
}

type MessagesType={
    id:number,
    dialog:string
}

let initialState = {
    messages: [
        {id: 1, message: "hello"},
        {id: 2, message: "ivan"},
        {id: 3, message: "ell"},
        {id: 4, message: "ivanovich"},
        {id: 5, message: "zerro"}
    ] as Array<DialogType>,

    dialogs: [
        {id: 1, dialog: "nikolayi"},
        {id: 2, dialog: "ivan"},
        {id: 3, dialog: "ivanov"},
        {id: 4, dialog: "ivanovich"},
        {id: 5, dialog: "zerro"}
    ] as Array<MessagesType>,
    newMessageBody: ''
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageBody: action.body,
            };
        }
        case SEND_MESSAGE: {
            let body = action.message;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            };
        }
        default:
            return state;
    }

}


export const sendMessageCreator = (message:any) => {
    return {
        type: SEND_MESSAGE,
        message: message
    }
}

export const updateNewMessageBodyCreator = (body:any) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: body,
    }
}
export default dialogsReducer
