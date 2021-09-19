import React from 'react';
import s from './Dialogs.module.css';
import DialogItems from './DialogItems/DialogItems';
import Message from './Message/Message';
//import {sendmessage, updatemessage} from '../../redux/dialogs-reducer';
import Login from '../Login/Login';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export type DialogType = {
  id: number,
  name: string
}

export type MessageType = {
  id: number,
  message: string
}

type Messagepage = {
  Messagepage: {dialogData: Array<DialogType>,messageData: Array<MessageType>},
  sendmessage: (newmessage: string) => void
}

const Dialogs: React.FC<Messagepage> = (props) => {
console.log('dialog ', props)
	let dialogElements = props.Messagepage.dialogData.map(dialog => <DialogItems name={dialog.name}
		id={dialog.id} />);

	let messagesElemets = props.Messagepage.messageData.map(message => <Message message={message.message} />);

	/*let newmessagebody = props.Messagepage.newMessage;

	let onSendMessage = () => {
		props.sendMessage();
	};
*/

   let addNewMessage = (newmessage: string) => {
	   props.sendmessage(newmessage);
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


  const SignupSchema = Yup.object().shape({
    newmessage: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
  });

  type AddMessageFormType = {
    addNewMessage: (newmessage: string) => void
  }

   const AddMessageForm: React.FC<AddMessageFormType> = (props) => (
    <div>
      <h1>New Message</h1>
      <Formik
        initialValues={{
			newmessage: ''
        }}
        validationSchema={SignupSchema}
        
        onSubmit={values => {
          // same shape as initial values
          //console.log("errors= ");
          props.addNewMessage(values.newmessage);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field className={errors.newmessage && touched.newmessage ? s.errors : null} name="newmessage"  id="newmessage"/>
            {errors.newmessage && touched.newmessage ? (
              <div>{errors.newmessage}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );