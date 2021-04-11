import React from 'react';
import { object } from 'yup/lib/locale';
import s from './Statistic.module.css';

const ProfileData =(props) => {
  console.log('5 ',props.profile);
return (
  <div className={s.statistic}>
   <div className={s.statinseason}>
       <div className={s.label}>Матчи</div><div>1</div>
       <div className={s.label}>Голы</div><div>1</div>
       <div className={s.label}>Голевые передачи</div><div>1</div>
   </div>
   <div className={s.headinfo}>
   {props.isowner || <button onClick={props.gotoEditMode}>Редактировать</button>}
   <div>Обо мне: {props.profile.aboutMe || "Нет информации"}</div>
   <div>Ищу клуб:{props.lookingForAJob ? " Да" : " Нет"}</div>
   {props.profile.lookingForAJobDescription && 
     <div>Мои скилы :{props.profile.lookingForAJobDescription}</div>
   }
   <div><b>Контакты:</b> {Object.keys(props.profile.contacts).map(key=> {
     return <Contact contactTitle={key} 
             contaceValue={props.profile.contacts[key]} key={key}/>}
   )}</div>
   </div>
  </div>   
)
}

export default ProfileData;

const Contact = ({contactTitle, contaceValue}) => {
  console.log(contactTitle, contaceValue)
  return (
  <div>
    <b>{contactTitle}</b>{contaceValue || " Нет"}
 </div>
  )
};