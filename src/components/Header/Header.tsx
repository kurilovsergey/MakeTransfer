import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

type HeaderType = {
    isAuth: boolean,
    login: (email: string , password: string, rememberme: boolean , captcha: string) => void,
    logout: () => void
}

const Header: React.FC<HeaderType> = (props) => {
    console.log('props header',props)
    return <div>
    <header className={s.header}>
        <div><img src='https://st4.depositphotos.com/11128870/20802/v/1600/depositphotos_208023944-stock-illustration-new-transfer-football-or-soccer.jpg' /></div>
        <div className={s.maketransfer}>MakeTransfer</div>
       
    </header>
    {props.isAuth ? 
     <div>{props.login}  <button onClick={props.logout}>Logout</button></div>
        : <div className={s.loginBlock}><NavLink to="/login">Login</NavLink></div>}
        
    </div>

}

export default Header;