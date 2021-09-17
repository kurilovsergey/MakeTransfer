import React from 'react';
import { object } from 'yup/lib/locale';
import { ProfileType, ContactsType } from '../../../../types/types';
import s from './Statistic.module.css';


type PropsType = {
  isowner: boolean,
  gotoEditMode: () => void,
  profile: ProfileType | null
}



const ProfileData: React.FC<PropsType> = (props) => {
  console.log('isowner ',props.isowner)


return (
  <div className={s.statistic}>
   <div className={s.statinseason}>
       <div className={s.label}>Матчи</div><div>1</div>
       <div className={s.label}>Голы</div><div>1</div>
       <div className={s.label}>Голевые передачи</div><div>1</div>
   </div>
   <div className={s.headinfo}>
   {props.isowner || <button onClick={()=>props.gotoEditMode()}>Редактировать</button>}
   <div>Обо мне: {props.profile?.aboutMe || "Нет информации"}</div>
   <div>Ищу клуб:{props.profile?.lookingForAJob ? " Да" : " Нет"}</div>
   {props.profile!.lookingForAJobDescription && 
     <div>Мои скилы :{props.profile!.lookingForAJobDescription}</div>
   }
   <div><b>Контакты:</b> {Object.keys(props.profile!.contacts).map(key=> {
     return <Contact contactTitle={key} 
             contaceValue={props.profile?.contacts[key as keyof ContactsType]} key={key}/>}
   )}</div>
   </div>
   
  </div>   
)
}

export default ProfileData;

type ContactPropsType = {
  contactTitle: string,
  contaceValue: string | undefined
}

const Contact: React.FC<ContactPropsType> = (props) => {
  
  return (
  <div>
    <b>{props.contactTitle}</b>{props.contaceValue || " Нет"}
 </div>
  )
};