import React from 'react';
import massiv from '../Dialogs';
import {updateNewMessageBodyCreator, sendMessageCreator} from '../../../redux/store';

const Message = (props) =>{
	/*let state = props.store.getState().MessagePage;

	let propselements = state.messages.map(item=> <p> {item.message}</p>);
	let newMessage = React.createRef();
	let newMessageBody = state.newMessageBody;

	let onNewMessageChange = (event) =>{
		let body = event.target.value;
		props.store.dispatch(updateNewMessageBodyCreator(body));
	}
	let addMessage=()=>{
		let text=newMessage.current.value;
		alert(text);
	}
	let onMessageClick = () =>{
		props.store.dispatch(sendMessageCreator());
	}*/
	return(
		<div >
			{props.message}
		</div>

	)
}

export default Message