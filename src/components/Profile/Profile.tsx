import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profileinfo from './Profileinfo/Profileinfo'
import { ProfileType } from '../../types/types';

type ValueType = {
  fullname?: string,
  aboutMe?: string,
  lookingForAJob?: boolean,
  lookingForAJobDescription?: string
}

type ProfileComponentType = {
  isowner: boolean,
  profile: ProfileType,
  savePhoto: () => void,
  status: string,
  updateStatus: (status: string) => void,
  messageError: string
  saveProfile: (values: ValueType, userId: number) => void
  gotoEditMode: () => void,
  resetMessageError: () => void,
}

const Profile: React.FC<ProfileComponentType> = (props) => {
  
  return (
    <div className={s.content}>
      <Profileinfo messageError={props.messageError} saveProfile={props.saveProfile} resetMessageError={props.resetMessageError} savePhoto={props.savePhoto} isowner={props.isowner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer />
    </div>
  )
}

export default Profile;