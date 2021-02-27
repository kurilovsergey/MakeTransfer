import React from 'react';
import s from './Profileinfo.module.css';
import Avatar from './information/Avatar.jsx';
import Statistic from './information/Statistic';
import Club from './information/Club';
import Name from './information/Name';

const Profileinfo =(props) => {
  console.log(props)
return (
      <div className={s.content}>
        <Avatar profile={props.profile} />
        <Name name='cr7' />
        <Statistic />
        <Club />
      </div>
)
}

export default Profileinfo;