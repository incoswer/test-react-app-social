import React from 'react';
import css from './Dialogs.module.css';
import {NavLink, Redirect} from 'react-router-dom';
import Message from './Message/Message';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validations/validations";

const Dialogs = (props) => {
    let propselements = props.dialogsItems.dialogs.map(item => <p> {item.id} {item.dialog}</p>);
    let messageElements = props.dialogsItems.messages.map(item => <Message message={item.message}/>);
    if (!props.isAuth) return <Redirect to={'/login'}></Redirect>;

    let addNewMessage =(values) =>{
        props.onClick(values.newMessageBody)
    }
    return (
        <div>
            <div className={css.dialogsItems}>
                {propselements}
            </div>

            <div className={css.messages}>
                {messageElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}
const maxSymbols20 = maxLengthCreator(20);
const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} validate={[required, maxSymbols20]} name='newMessageBody' placeholder='enter your message here'/>
        </div>
        <div>
            <button>Отправить</button>
        </div>
    </form>
}

const AddMessageFormRedux = reduxForm({form: 'dialogMessageForm'})(AddMessageForm)

export default Dialogs
