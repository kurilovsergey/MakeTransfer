import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Header from './Header'
import * as axios from 'axios';
import {connect} from 'react-redux';
import {getAuthUserData, logout, login} from '../../redux/Auth-reducer';
import { authAPI } from '../../api/api';
import { AppStateType } from '../../redux/reduxstore';


type HeaderContainerMapsStateToPropsType = ReturnType<typeof mapStateToProps>

type HeaderContainerMapsDispatchToPropsType = {
  login: (email: string , password: string, rememberme: boolean , captcha: string) => void,
  logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerMapsStateToPropsType & HeaderContainerMapsDispatchToPropsType> {

    render() {  return <Header {...this.props}/>
    }
}
    
const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.Auth.isAuth,
  //login: state.Auth.login,
  email: state.Auth.email
  
});


    export default  connect<HeaderContainerMapsStateToPropsType, HeaderContainerMapsDispatchToPropsType, {}, AppStateType>(mapStateToProps,{login, logout})(HeaderContainer);