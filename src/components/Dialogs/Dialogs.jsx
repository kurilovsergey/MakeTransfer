import React from 'react';
import s from './Dialogs.module.css';
import DialogItems from './DialogItems/DialogItems';
import Message from './Message/Message.jsx';
import {sendmessage, updatemessage} from '../../redux/dialogs-reducer';
import Login from '../Login/Login';
import { Formik, Form, Field, ErrorMessage } from 'formik';




const Dialogs = (props) => {

	let dialogElements = props.Messagepage.dialogData.map(dialog => <DialogItems name={dialog.name}
		id={dialog.id} />);

	let messagesElemets = props.Messagepage.messageData.map(message => <Message message={message.message} />);

	let newmessagebody = props.Messagepage.newMessage;

	let onSendMessage = () => {
		props.sendMessage();
	};


   let addNewMessage = (newmessage) => {
	   props.sendMessage(newmessage);
   }

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogElements}
			</div>
			<div className={s.messages}>
				<div> {messagesElemets}</div>
				<AddMessageForm addNewMessage={addNewMessage}/>
			</div>
			
		</div>
	);
}

export default Dialogs;

const AddMessageForm = (props) => (

	<div>
	  <Formik
		initialValues={{
		  newmessage: ''
		}}
		onSubmit={async (values) => {
		  await new Promise((r) => setTimeout(r, 500));
		  //alert(JSON.stringify(values, null, 2));
		 //console.log(props); 
		 props.addNewMessage(values.newmessage);
		}}
	  >
	   
		<Form>
		  <Field id="newmessage" name="newmessage" placeholder="your text" />

		  <button type="submit">Send</button>
		</Form>
	  </Formik>
	</div>
  );