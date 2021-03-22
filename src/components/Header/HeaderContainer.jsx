import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Header from './Header.jsx'
import * as axios from 'axios';
import {connect} from 'react-redux';
import {getAuthUserData, logout} from '../../redux/Auth-reducer';
import { authAPI } from '../../api/api';


class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.getAuthUserData();
}

    render() {  return <Header {...this.props}/>
    }
}
    
const mapStateToProps = (state) => ({
  isAuth: state.Auth.isAuth,
  login: state.Auth.login,
  email: state.Auth.email

});


    export default connect(mapStateToProps,{getAuthUserData, logout})(HeaderContainer);