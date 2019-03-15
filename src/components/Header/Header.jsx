import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return <header className={s.header}>
        <div><img src='https://st4.depositphotos.com/11128870/20802/v/1600/depositphotos_208023944-stock-illustration-new-transfer-football-or-soccer.jpg' /></div>
        <div className={s.maketransfer}>MakeTransfer</div>
    </header>
}

export default Header;