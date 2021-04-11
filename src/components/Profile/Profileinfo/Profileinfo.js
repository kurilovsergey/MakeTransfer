import React, {useState} from 'react';
import s from './Profileinfo.module.css';
import Avatar from './information/Avatar.jsx';
import ProfileData from './information/ProfileData';
import ProfileDataForm from './information/ProfileDataForm';
import Club from './information/Club';
import Name from './information/Name';

const Profileinfo =(props) => {
  let [editMode, setEditMode] = useState(false)

  const gotoEditMode = () =>{
   setEditMode(true);
  }

  console.log('3 ',props);
return (
      <div className={s.content}>
        <Avatar isowner={props.isowner} profile={props.profile} savePhoto={props.savePhoto}/>
        <Name profile={props.profile}  autorizatedUserID={props.autorizatedUserID} status={props.status} updateStatus={props.updateStatus} updateStatus={props.updateStatus}/>
        {editMode ? <ProfileDataForm setEditMode={setEditMode} saveProfile={props.saveProfile} isowner={props.isowner} profile={props.profile}/> 
        : <ProfileData gotoEditMode={gotoEditMode} profile={props.profile}/>}
        <Club />
      </div>
)
}

export default Profileinfo;