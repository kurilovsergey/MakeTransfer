import React from 'react';
import s from './Dialogs.module.css';
import DialogItems from './DialogItems/DialogItems';
import Message from './Message/Message.jsx';
import {sendmessage, updatemessage} from '../../redux/dialogs-reducer';

const Dialogs = (props) => {


debugger
let dialogElements = props.Messagepage.dialogData.map(dialog=><DialogItems name={dialog.name} 
	  id={dialog.id}/>);

let messagesElemets = props.Messagepage.messageData.map(message=><Message message={message.message}/>);

let newmessagebody = props.Messagepage.newMessage;

let onSendMessage = () => {
props.sendMessage();
}

let onNewMessage = (event) => {
 let body = event.target.value;
 props.updatenewmessage(body);
 
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