import React from 'react';
import { Redirect } from 'react-router-dom';
import s from './Dialogs.module.css';
import {withAuthRedirect} from '../../hoc/hoc'
import {sendmessage} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxstore';

//type MapPropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppStateType) => {
	return {
		Messagepage: state.Messagepage,
	   }
}

type mapDispatchTooPropsType = {
	sendmessage: (newmessage: string) => void
}


/*
const mapDispatchTooProps = (dispatch) => {
	return {
		sendMessage: (newmessage) => {dispatch(sendmessage(newmessage))}
}
}
*/

//let AuthRedirectComponent = WithAuthRedirect(Dialogs);

//const DialogsContainer = connect(mapStateToProps, mapDispatchTooProps)(AuthRedirectComponent);

export default compose<React.ComponentType>(
	connect(mapStateToProps, {sendmessage}),
	withAuthRedirect
)(Dialogs);