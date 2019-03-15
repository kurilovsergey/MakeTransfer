import React from 'react';
import s from './Dialogs.module.css';
import DialogItems from './DialogItems/DialogItems';
import Message from './Message/Message.jsx';
import {sendmessage, updatemessage} from '../../redux/dialogs-reducer';

const Dialogs = (props) => {

let state = props.store.getState().Messagepage;

let dialogElements = state.dialogData.map(dialog=><DialogItems name={dialog.name} 
	  id={dialog.id}/>);

let messagesElemets = state.messageData.map(message=><Message message={message.message}/>);

let newmessagebody = state.newMessage;

let onSendMessage = () => {
props.store.dispatch(sendmessage())
}

let onNewMessage = (event) => {
 let body = event.target.value;
 props.store.dispatch(updatemessage(body));
}


	return (
		<div className={s.dialogs}>
		  <div className={s.dialogsItems}>
		   {dialogElements}
		 </div>
	     <div className={s.messages}>
          <div> {messagesElemets}</div>
		  <div>
			  <div><textarea onChange={onNewMessage} value={newmessagebody} placeholder="your message..."></textarea></div>
			  <div><button onClick={onSendMessage}>Send</button></div>
		  </div>
	     </div>
	</div>
		)
}

export default Dialogs;