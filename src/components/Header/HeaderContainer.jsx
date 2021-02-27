import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Header from './Header.jsx'
import * as axios from 'axios';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../redux/Auth-reducer';

class HeaderContainer extends React.Component {

  componentDidMount() {
    
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
        .then(response => {
            
            let {id,email,login}=response.data.data
            if (response.data.resultCode==0) {this.props.setAuthUserData(id,login,email)}
            debugger
        });
}

    render() {  return <Header {...this.props}/>
    }
}
    
const mapStateToProps = (state) => ({
  isAuth: state.Auth.isAuth,
  login: state.Auth.login,
  email: state.Auth.email

});


    export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer);