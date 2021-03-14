import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

export const WithAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
         
        render() {
            console.log(this.props.isAuth);
    if (!this.props.isAuth) return <Redirect to={"/login"}/>
	return <Component {...this.props}/>
    }
}

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.Auth.isAuth
    });

let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

return ConnectedAuthRedirectComponent
}