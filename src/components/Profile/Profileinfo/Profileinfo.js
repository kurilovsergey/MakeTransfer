import React from 'react';
import s from './Profileinfo.module.css';
import Avatar from './information/Avatar.jsx';
import Statistic from './information/Statistic';
import Club from './information/Club';
import Name from './information/Name';

const Profileinfo =() => {
return (
      <div className={s.content}>
        <Avatar />
        <Name name='cr7' />
        <Statistic />
        <Club />
      </div>
)
}

export default Profileinfo;