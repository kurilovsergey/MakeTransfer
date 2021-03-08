import React from 'react';
import { Redirect } from 'react-router-dom';
import s from './Dialogs.module.css';
import {WithAuthRedirect} from '../../components/../hoc/hoc'
import {sendmessage, updatemessage} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { compose } from 'redux';


const mapStateToProps = (state) => {
	return {
		Messagepage: state.Messagepage,
	   }
}

const mapDispatchTooProps = (dispatch) => {
	return {
		sendMessage: () => {dispatch(sendmessage())},
	    updatenewmessage: (body) => {dispatch(updatemessage(body))}  }
}



//let AuthRedirectComponent = WithAuthRedirect(Dialogs);

//const DialogsContainer = connect(mapStateToProps, mapDispatchTooProps)(AuthRedirectComponent);

export default compose(
	connect(mapStateToProps, mapDispatchTooProps),
	WithAuthRedirect
)(Dialogs);;