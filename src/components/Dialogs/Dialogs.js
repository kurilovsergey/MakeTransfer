import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItems = (props) => {
	let path="/dialogs/"+props.id;
	return <div className={s.dialog+' '+s.active}>
		<NavLink to={path}>{props.name}</NavLink>
				</div>
}

const Message = (props) => {
	return  <div className={s.dialog}>{props.message}</div>
	
}

const Dialogs = (props) => {

	let dialogData = [
		{id: 1, name: 'Player1'},
		{id: 2, name: 'Coach'},
		{id: 3, name: 'Agent1'}
	]

	let messageData = [
		{id: 1, message: "What your club?"},
		{id: 2, message: "I see your vidio?"},
		{id: 3, message: "I find club"}
	]
	
	let dialogElements = dialogData.map(dialog=><DialogItems name={dialog.name} 
	  id={dialog.id}/>);

	let messagesElemets = messageData.map(message=><Message message={message.message}/>);

	return (
		<div className={s.dialogs}>
		  <div className={s.dialogsItems}>
		   {dialogElements}
		 </div>
	     <div className={s.messages}>
          {messagesElemets} 
	     </div>
	</div>
		)
}

export default Dialogs;