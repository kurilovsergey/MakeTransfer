import React from 'react';
import s from './Profileinfo.module.css';
import Avatar from './information/Avatar.jsx';
import Statistic from './information/Statistic';
import Club from './information/Club';
import Name from './information/Name';

const Profileinfo =(props) => {
  console.log("prifle-info, ",props);
return (
      <div className={s.content}>
        <Avatar isowner={props.isowner} profile={props.profile} savePhoto={props.savePhoto}/>
        <Name fullName={props.fullName} autorizatedUserID={props.autorizatedUserID} status={props.status} updateStatus={props.updateStatus} updateStatus={props.updateStatus}/>
        <Statistic />
        <Club />
      </div>
)
}

export default Profileinfo;