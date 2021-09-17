import React, {useState} from 'react';
import s from './Profileinfo.module.css';
import Avatar from './information/Avatar';
import ProfileData from './information/ProfileData';
import ProfileDataForm from './information/ProfileDataForm';
import Club from './information/Club';
import Name from './information/Name';
import {ProfileType} from '../../../types/types'

type ValueType = {
  fullname?: string,
  aboutMe?: string,
  lookingForAJob?: boolean,
  lookingForAJobDescription?: string
}

type PropsType = {
  isowner: boolean,
  profile: ProfileType,
  savePhoto: () => void,
  status: string,
  updateStatus: (status: string) => void,
  messageError: string
  saveProfile: (values: ValueType, userId: number) => void
  resetMessageError: () => void
  
}

const Profileinfo: React.FC<PropsType> = (props) =>  {
  let [editMode, setEditMode] = useState<boolean>(false)
  
  const gotoEditMode = () =>{
   setEditMode(!editMode);
   console.log('editmode 1 ',editMode);
  }


  //console.log('edit ',editMode);
  
return (
      <div className={s.content}>
        <Avatar isowner={props.isowner} profile={props.profile} savePhoto={props.savePhoto}/>
        <Name profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
        {editMode ? <ProfileDataForm resetMessageError={props.resetMessageError} gotoEditMode={gotoEditMode}  messageError={props.messageError} saveProfile={props.saveProfile}  profile={props.profile}/> 
        : <ProfileData gotoEditMode={gotoEditMode} isowner={props.isowner} profile={props.profile}/>}
        <Club />
      </div>
)
}

export default Profileinfo;
