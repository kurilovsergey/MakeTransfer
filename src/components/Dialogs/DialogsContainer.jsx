import React from 'react';
import s from './Dialogs.module.css';

import {sendmessage, updatemessage} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
	return {
		Messagepage: state.Messagepage,
	    isAuth: state.Auth.isAuth }
}

const mapDispatchTooProps = (dispatch) => {
	return {
		sendMessage: () => {dispatch(sendmessage())},
	    updatenewmessage: (body) => {dispatch(updatemessage(body))}  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchTooProps)(Dialogs);

export default DialogsContainer;