import React from 'react';
import s from './Dialogs.module.css';

import {sendmessage, updatemessage} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {

let state = props.store.getState().Messagepage;

let onSendMessage = () => {
props.store.dispatch(sendmessage());
}

let onNewMessage = (body) => {
 props.store.dispatch(updatemessage(body));
}
	return (
		<Dialogs
		sendMessage={onSendMessage}
		updatenewmessage={onNewMessage}
		state={state}
		/>
		)
}

export default DialogsContainer;